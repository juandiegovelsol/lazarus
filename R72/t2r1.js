// Predefined templates for different pages
var TemplateManager = /** @class */ (function () {
    function TemplateManager() {
        this.templates = [];
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
    TemplateManager.prototype.getTemplates = function () {
        return this.templates;
    };
    // Get a template by its name
    TemplateManager.prototype.getTemplateByName = function (name) {
        return this.templates.find(function (template) { return template.name === name; });
    };
    return TemplateManager;
}());
// Update the PageBuilder class to use templates
var PageBuilder = /** @class */ (function () {
    function PageBuilder(templateManager) {
        this.components = [];
        this.templateManager = templateManager;
    }
    // Select a template by its name
    PageBuilder.prototype.selectTemplate = function (name) {
        this.selectedTemplate = this.templateManager.getTemplateByName(name);
    };
    // Add a component to the builder
    PageBuilder.prototype.addComponent = function (component) {
        this.components.push(component);
    };
    // Render the page using the selected template
    PageBuilder.prototype.renderPage = function () {
        if (!this.selectedTemplate) {
            throw new Error('No template selected');
        }
        var templateLayout = this.selectedTemplate.layout;
        var renderedComponents = {};
        this.components.forEach(function (component) {
            if (component instanceof HeaderComponent) {
                renderedComponents['header'] = component.render();
            }
            else if (component instanceof FooterComponent) {
                renderedComponents['footer'] = component.render();
            }
            else if (component instanceof ContentComponent) {
                renderedComponents['content'] = component.render();
            }
        });
        // Replace placeholders in the template layout with rendered components
        return templateLayout.replace(/{{(header|footer|content)}}/g, function (match, key) { return renderedComponents[key] || ''; });
    };
    return PageBuilder;
}());
// Example usage
var templateManager = new TemplateManager();
var pageBuilder = new PageBuilder(templateManager);
// Select a template
pageBuilder.selectTemplate('Home Page Template');
// Create component instances
var header = new HeaderComponent(dataSource, logger);
var footer = new FooterComponent();
var content = new ContentComponent(dataSource);
// Add components to the builder
pageBuilder.addComponent(header);
pageBuilder.addComponent(content);
pageBuilder.addComponent(footer);
// Render the page
console.log(pageBuilder.renderPage());
