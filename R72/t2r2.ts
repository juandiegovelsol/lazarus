// Define a new interface for templates
interface Template {
  name: string;
  description: string;
  layout: string; // This will store the HTML layout of the template
}

// Define some predefined templates
class HomePageTemplate implements Template {
  name = "Home Page";
  description = "A template for the home page";
  layout = "<header>{{header}}</header><main>{{content}}</main>";
}

class AboutPageTemplate implements Template {
  name = "About Page";
  description = "A template for the about page";
  layout = "<header>{{header}}</header><main>{{content}}</main><footer>{{footer}}</footer>";
}

class ContactPageTemplate implements Template {
  name = "Contact Page";
  description = "A template for the contact page";
  layout = "<header>{{header}}</header><main>{{content}}</main>";
}

// Create a template repository to store all available templates
class TemplateRepository {
  private templates: Template[] = [];

  constructor() {
    this.templates.push(new HomePageTemplate());
    this.templates.push(new AboutPageTemplate());
    this.templates.push(new ContactPageTemplate());
  }

  // Method to get all templates
  getTemplates(): Template[] {
    return this.templates;
  }

  // Method to get a template by name
  getTemplateByName(name: string): Template | undefined {
    return this.templates.find(template => template.name === name);
  }
}

// Update the PageBuilder class to use templates
class PageBuilder {
  private components: Component[] = [];
  private templateRepository: TemplateRepository;

  constructor(templateRepository: TemplateRepository) {
    this.templateRepository = templateRepository;
  }

  // Method to add a component to the builder
  addComponent(component: Component): void {
    this.components.push(component);
  }

  // Method to render a page using a template
  renderPage(templateName: string): string {
    const template = this.templateRepository.getTemplateByName(templateName);
    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }

    let renderedContent = template.layout;
    this.components.forEach(component => {
      if (component instanceof HeaderComponent) {
        renderedContent = renderedContent.replace("{{header}}", component.render());
      } else if (component instanceof ContentComponent) {
        renderedContent = renderedContent.replace("{{content}}", component.render());
      } else if (component instanceof FooterComponent) {
        renderedContent = renderedContent.replace("{{footer}}", component.render());
      }
    });

    return renderedContent;
  }
}

// Usage example
const templateRepository = new TemplateRepository();
const pageBuilder = new PageBuilder(templateRepository);

const header = new HeaderComponent(dataSource, logger);
const content = new ContentComponent(dataSource);
const footer = new FooterComponent();

pageBuilder.addComponent(header);
pageBuilder.addComponent(content);
pageBuilder.addComponent(footer);

console.log(pageBuilder.renderPage("Home Page"));