// config.ts
const process: { env: { NODE_ENV: 'production' | 'development' } } = {
  env: { NODE_ENV: 'production' }
};
const isProduction = process.env.NODE_ENV === 'production';

// logger.ts
class Logger {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }

  error(message: string): void {
    console.error(`[ERROR]: ${message}`);
  }
}

// errors.ts
class ComponentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ComponentError';
  }
}

// middleware.ts
interface Middleware {
  process(data: string): string;
}

class UpperCaseMiddleware implements Middleware {
  process(data: string): string {
    return data.toUpperCase();
  }
}

// data-sources.ts
interface DataSource {
  fetchData(): string;
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

// components.ts
interface Component {
  render(): string;
}

abstract class BaseComponent implements Component {
  abstract render(): string;
}

function TrackUsage(target: typeof BaseComponent | any) {
  const originalRender = target.prototype.render;
  target.prototype.render = function () {
    console.log(`Rendering ${target.name}...`);
    return originalRender.call(this);
  };
}

@TrackUsage
class HeaderComponent extends BaseComponent {
  private dataSource: DataSource;
  private logger: Logger;

  constructor(dataSource: DataSource, logger: Logger) {
    super();
    this.dataSource = dataSource;
    this.logger = logger;
  }

  render(): string {
    const data = this.dataSource.fetchData();
    this.logger.log("Rendering header with data: " + data);
    if (data.includes("error")) {
      this.logger.error("Error rendering header");
      throw new ComponentError("Simulated Error");
    }
    return `<header>${data}</header>`;
  }
}

@TrackUsage
class FooterComponent extends BaseComponent {
  render(): string {
    return "<footer>Footer Content</footer>";
  }
}

@TrackUsage
class ContentComponent extends BaseComponent {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    super();
    this.dataSource = dataSource;
  }

  render(): string {
    const data = this.dataSource.fetchData();
    return `<main>${data}</main>`;
  }
}

// template-manager.ts
interface Template {
  name: string;
  description: string;
  layout: string;
}

class TemplateManager {
  private templates: Template[] = [
    {
      name: 'Home Page Template',
      description: 'A template for the home page',
      layout: '<h1>Home Page</h1>{{header}}{{content}}{{footer}}'
    },
    {
      name: 'About Page Template',
      description: 'A template for the about page',
      layout: '<h1>About Page</h1>{{header}}{{content}}'
    },
    {
      name: 'Contact Page Template',
      description: 'A template for the contact page',
      layout: '<h1>Contact Page</h1>{{header}}{{content}}'
    }
  ];

  getTemplates(): Template[] {
    return this.templates;
  }

  getTemplateByName(name: string): Template | undefined {
    return this.templates.find(template => template.name === name);
  }
}

// page-builder.ts
class PageBuilder {
  private components: Component[] = [];
  private logger: Logger;
  private templateManager: TemplateManager;
  private selectedTemplate: Template | undefined;

  constructor(logger: Logger, templateManager: TemplateManager) {
    this.logger = logger;
    this.templateManager = templateManager;
  }

  selectTemplate(name: string): void {
    this.selectedTemplate = this.templateManager.getTemplateByName(name);
    if (!this.selectedTemplate) {
      this.logger.error("Template not found: " + name);
      throw new ComponentError("Template not found");
    }
  }

  addComponent(component: Component): void {
    this.components.push(component);
  }

  renderPage(): string {
    if (!this.selectedTemplate) {
      throw new Error('No template selected');
    }

    const templateLayout = this.selectedTemplate.layout;
    const renderedComponents: { [key: string]: string } = {};

    this.components.forEach(component => {
      if (component instanceof HeaderComponent) {
        renderedComponents['header'] = component.render();
      } else if (component instanceof FooterComponent) {
        renderedComponents['footer'] = component.render();
      } else if (component instanceof ContentComponent) {
        renderedComponents['content'] = component.render();
      }
    });

    return templateLayout.replace(/{{(header|footer|content)}}/g, (_, key) => renderedComponents[key] || '');
  }
}

// main.ts
const logger = new Logger();
const dataSource = isProduction ? new ApiDataSource() : new DatabaseDataSource();

const header = new HeaderComponent(dataSource, logger);
const footer = new FooterComponent();
const content = new ContentComponent(dataSource);

const templateManager = new TemplateManager();
const pageBuilder = new PageBuilder(logger, templateManager);

pageBuilder.selectTemplate('About Page Template');
pageBuilder.addComponent(header);
pageBuilder.addComponent(content);
pageBuilder.addComponent(footer);

console.log(pageBuilder.renderPage());