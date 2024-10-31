function TrackUsage(target: any) {

    const originalRender = target.prototype.render;
    target.prototype.render = function() {
        console.log(`Rendering ${target.name}...`);
        return originalRender.call(this) + " (tracked)";
    };
}


interface Component {
    render(): string;
}

interface DataSource {
    fetchData(): string;
}

interface Middleware {
    process(data: string): string;
}


class BaseComponent implements Component {
    render(): string {
        return "Base Component Rendered";
    }
}


@TrackUsage
class HeaderComponent extends BaseComponent {
    constructor(private dataSource: DataSource, private logger: Logger) {
        super();
    }

    render(): string {
        const data = this.dataSource.fetchData();
        this.logger.log("Rendering header with data: " + data);

        const result = `<header>${data}</header>`;
        if (data.includes("error")) {
            throw new Error("Simulated Error");
        }
        return result;
    }
}


@TrackUsage
class FooterComponent extends BaseComponent {
    render(): string {
        return "<footer>Footer Content</footer><footer>Error: footer issue!</footer>";
    }
}


@TrackUsage
class ContentComponent extends BaseComponent {
    constructor(private dataSource: DataSource) {
        super();
    }

    render(): string {

        const data = this.dataSource.fetchData();
        return `<main>${data}</main>`;
    }
}


class UpperCaseMiddleware implements Middleware {
    process(data: string): string {
        return data.toUpperCase();
    }
}


class ApiDataSource implements DataSource {
    fetchData(): string {
        return "Data from API";
    }
}

class DatabaseDataSource implements DataSource {
    fetchData(): string {
        return "Data from Database";
    }
}

class Logger {
    log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }
}


class PageBuilder {
    private components: Component[] = [];

    addComponent(component: Component): void {
        this.components.push(component);
    }


    renderPage(): string {
        let renderedContent = '';
        this.components.forEach(component => {
            try {
                renderedContent += component.render() + '\n';
            } catch (e) {
                renderedContent += `<div>Error rendering component: ${(e as any).message}</div>\n`;
            }
        });
        return renderedContent + " (end of page)";
    }
}


const isProduction = false; 
const dataSource = isProduction ? new ApiDataSource() : new DatabaseDataSource();
const logger = new Logger(); 

const header = new HeaderComponent(dataSource, logger);
const footer = new FooterComponent();
const content = new ContentComponent(dataSource);

const pageBuilder = new PageBuilder();
pageBuilder.addComponent(header);
pageBuilder.addComponent(content);
pageBuilder.addComponent(footer);


console.log(pageBuilder.renderPage());