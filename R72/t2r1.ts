// Template interface
interface Template {
  name: string;
  description: string;
  layout: string; // HTML layout for the template
}

// Predefined templates for different pages
class TemplateManager {
  private templates: Template[] = [];

  constructor() {
    this.templates = [
      {
        name: 'Home Page Template',
        description: 'A template for the home page',
        layout: '<header>{{header}}</header><main>{{content}}</main><footer>{{footer}}</footer>'
      },
      {
        name: 'About Page Template',
        description: 'A template for the about page',
        layout: '<header>{{header}}</header><main>{{content}}</main>'
      },
      {
        name: 'Contact Page Template',
        description: 'A template for the contact page',
        layout: '<header>{{header}}</header><main>{{content}}</main><footer>{{footer}}</footer>'
      }
    ];
  }

  // Get all available templates
  getTemplates(): Template[] {
    return this.templates;
  }

  // Get a template by its name
  getTemplateByName(name: string): Template | undefined {
    return this.templates.find(template => template.name === name);
  }
}

// Update the PageBuilder class to use templates
class PageBuilder {
  private components: Component[] = [];
  private templateManager: TemplateManager;
  private selectedTemplate: Template | undefined;

  constructor(templateManager: TemplateManager) {
    this.templateManager = templateManager;
  }

  // Select a template by its name
  selectTemplate(name: string): void {
    this.selectedTemplate = this.templateManager.getTemplateByName(name);
  }

  // Add a component to the builder
  addComponent(component: Component): void {
    this.components.push(component);
  }

  // Render the page using the selected template
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

    // Replace placeholders in the template layout with rendered components
    return templateLayout.replace(/{{(header|footer|content)}}/g, (match, key) => renderedComponents[key] || '');
  }
}

// Example usage
const templateManager = new TemplateManager();
const pageBuilder = new PageBuilder(templateManager);

// Select a template
pageBuilder.selectTemplate('Home Page Template');

// Create component instances
const header = new HeaderComponent(dataSource, logger);
const footer = new FooterComponent();
const content = new ContentComponent(dataSource);

// Add components to the builder
pageBuilder.addComponent(header);
pageBuilder.addComponent(content);
pageBuilder.addComponent(footer);

// Render the page
console.log(pageBuilder.renderPage());