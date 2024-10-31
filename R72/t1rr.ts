// config.ts
// Mock environment configuration
const processs: { env: { NODE_ENV: 'production' | 'development' } } = {
  env: { NODE_ENV: 'production' }
};

const isProduction = processs.env.NODE_ENV === 'production';

// logger.ts
class Logger {
  // Log a message to the console
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }

  // Log an error message to the console
  error(message: string): void {
    console.error(`[ERROR]: ${message}`);
  }
}

// errors.ts
// Custom error class for component-specific errors
class ComponentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ComponentError'; // Set the error name
  }
}

// middleware.ts
interface Middleware {
  process(data: string): string; // Method for processing data
}

// Convert text to upper case
class UpperCaseMiddleware implements Middleware {
  process(data: string): string {
    return data.toUpperCase();
  }
}

// data-sources.ts
interface DataSource {
  fetchData(): string;
}

// Fetch data from an API
class ApiDataSource implements DataSource {
  fetchData(): string {
    return "Data from API"; // Simulated API data
  }
}

// Fetch data from a database
class DatabaseDataSource implements DataSource {
  fetchData(): string {
    return "Data from Database"; // Simulated Database data
  }
}

// components.ts
interface Component {
  render(): string; // Render method for components
}

// Base class for all components
abstract class BaseComponent implements Component {
  abstract render(): string;
}

// Decorator for tracking usage of component rendering
function TrackUsage(target: typeof BaseComponent | any) {
  const originalRender = target.prototype.render; // Store the original render method
  // Override the render method to add tracking functionality
  target.prototype.render = function () {
    console.log(`Rendering ${target.name}...`); // Log when the component is being rendered
    return originalRender.call(this); // Call the original render method and return its result
  };
}

// Header component with logging and error handling
@TrackUsage // Apply the TrackUsage decorator to track rendering
class HeaderComponent extends BaseComponent {
  private dataSource: DataSource;
  private logger: Logger;

  constructor(dataSource: DataSource, logger: Logger) {
    super();
    this.dataSource = dataSource;
    this.logger = logger;
  }

  render(): string {
    const data = this.dataSource.fetchData(); // Fetch data from the data source
    this.logger.log("Rendering header with data: " + data); // Log the rendering process

    // Simulated error handling
    if (data.includes("error")) {
      this.logger.error("Error rendering header");
      throw new ComponentError("Simulated Error"); // Throw a custom error if an issue occurs
    }

    return `<header>${data}</header>`; // Return the rendered header
  }
}

// Footer component with no errors
@TrackUsage // Apply the TrackUsage decorator to track rendering
class FooterComponent extends BaseComponent {
  render(): string {
    return "<footer>Footer Content</footer>";
  }
}

// Content component that fetches data
@TrackUsage // Apply the TrackUsage decorator to track rendering
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

// page-builder.ts
class PageBuilder {
  private components: Component[] = []; // Array to store components
  private logger: Logger; // Logger instance for logging messages

  constructor(logger: Logger) {
    this.logger = logger;
  }

  // Method to add a component to the builder
  addComponent(component: Component): void {
    this.components.push(component); // Push the component into the components array
  }

  // Render all components and handle errors
  renderPage(): string {
    let renderedContent = '';
    this.components.forEach(component => {
      try {
        renderedContent += component.render() + '\n';
      } catch (e: unknown) {
        // Handle known and unknown errors
        if (e instanceof ComponentError) {
          renderedContent += `<div>Error rendering component: ${e.message}</div>\n`; // Render error message for known errors
        } else {
          this.logger.error("Unexpected error rendering component");
          throw e; // Rethrow unexpected errors
        }
      }
    });
    return renderedContent + " (end of page)"; // Return the complete rendered content with an end marker
  }
}

// main.ts
const logger = new Logger(); // Create a logger instance
const dataSource = isProduction ? new ApiDataSource() : new DatabaseDataSource(); // Use API or Database based on the environment

// Create component instances
const header = new HeaderComponent(dataSource, logger);
const footer = new FooterComponent();
const content = new ContentComponent(dataSource);

// Create a page builder and add components
const pageBuilder = new PageBuilder(logger);
pageBuilder.addComponent(header);
pageBuilder.addComponent(content);
pageBuilder.addComponent(footer);

// Render and log the complete page
console.log(pageBuilder.renderPage());