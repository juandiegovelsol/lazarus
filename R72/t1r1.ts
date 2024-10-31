// TrackUsage decorator
function TrackUsage(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Rendering ${target.constructor.name}...`);
    return originalMethod.apply(this, args);
  };
  return descriptor;
}

// Middleware pipeline
class MiddlewarePipeline {
  private middleware: Middleware[] = [];

  addMiddleware(middleware: Middleware) {
    this.middleware.push(middleware);
  }

  process(data: string) {
    let result = data;
    for (const middleware of this.middleware) {
      result = middleware.process(result);
    }
    return result;
  }
}

// Updated Component interface
interface Component {
  init(): void;
  render(): string;
  destroy(): void;
}

// Updated HeaderComponent
@TrackUsage
class HeaderComponent implements Component {
  private dataSource: DataSource;
  private logger: Logger;
  private middlewarePipeline: MiddlewarePipeline;

  constructor(dataSource: DataSource, logger: Logger) {
    this.dataSource = dataSource;
    this.logger = logger;
    this.middlewarePipeline = new MiddlewarePipeline();
  }

  init() {
    this.middlewarePipeline.addMiddleware(new UpperCaseMiddleware());
  }

  render() {
    try {
      const data = this.dataSource.fetchData();
      const processedData = this.middlewarePipeline.process(data);
      this.logger.log(`Rendering header with data: ${processedData}`);
      return `<header>${processedData}</header>`;
    } catch (error) {
      this.logger.log(`Error rendering header: ${error.message}`);
      return `<div>Error rendering header: ${error.message}</div>`;
    }
  }

  destroy() {
    // Clean up resources
  }
}

// Updated PageBuilder
class PageBuilder {
  private components: Component[] = [];

  addComponent(component: Component) {
    this.components.push(component);
  }

  renderPage() {
    let renderedContent = '';
    for (const component of this.components) {
      component.init();
      renderedContent += component.render() + '\n';
      component.destroy();
    }
    return renderedContent + ' (end of page)';
  }
}

// Usage
const dataSource = new ApiDataSource();
const logger = new Logger();
const header = new HeaderComponent(dataSource, logger);
const pageBuilder = new PageBuilder();
pageBuilder.addComponent(header);
console.log(pageBuilder.renderPage());