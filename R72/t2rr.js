var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
// config.ts
var process = {
    env: { NODE_ENV: 'production' }
};
var isProduction = process.env.NODE_ENV === 'production';
// logger.ts
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.log = function (message) {
        console.log("[LOG]: ".concat(message));
    };
    Logger.prototype.error = function (message) {
        console.error("[ERROR]: ".concat(message));
    };
    return Logger;
}());
// errors.ts
var ComponentError = /** @class */ (function (_super) {
    __extends(ComponentError, _super);
    function ComponentError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'ComponentError';
        return _this;
    }
    return ComponentError;
}(Error));
var UpperCaseMiddleware = /** @class */ (function () {
    function UpperCaseMiddleware() {
    }
    UpperCaseMiddleware.prototype.process = function (data) {
        return data.toUpperCase();
    };
    return UpperCaseMiddleware;
}());
var ApiDataSource = /** @class */ (function () {
    function ApiDataSource() {
    }
    ApiDataSource.prototype.fetchData = function () {
        return "Data from API";
    };
    return ApiDataSource;
}());
var DatabaseDataSource = /** @class */ (function () {
    function DatabaseDataSource() {
    }
    DatabaseDataSource.prototype.fetchData = function () {
        return "Data from Database";
    };
    return DatabaseDataSource;
}());
var BaseComponent = /** @class */ (function () {
    function BaseComponent() {
    }
    return BaseComponent;
}());
function TrackUsage(target) {
    var originalRender = target.prototype.render;
    target.prototype.render = function () {
        console.log("Rendering ".concat(target.name, "..."));
        return originalRender.call(this);
    };
}
var HeaderComponent = function () {
    var _classDecorators = [TrackUsage];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = BaseComponent;
    var HeaderComponent = _classThis = /** @class */ (function (_super) {
        __extends(HeaderComponent_1, _super);
        function HeaderComponent_1(dataSource, logger) {
            var _this = _super.call(this) || this;
            _this.dataSource = dataSource;
            _this.logger = logger;
            return _this;
        }
        HeaderComponent_1.prototype.render = function () {
            var data = this.dataSource.fetchData();
            this.logger.log("Rendering header with data: " + data);
            if (data.includes("error")) {
                this.logger.error("Error rendering header");
                throw new ComponentError("Simulated Error");
            }
            return "<header>".concat(data, "</header>");
        };
        return HeaderComponent_1;
    }(_classSuper));
    __setFunctionName(_classThis, "HeaderComponent");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeaderComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeaderComponent = _classThis;
}();
var FooterComponent = function () {
    var _classDecorators = [TrackUsage];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = BaseComponent;
    var FooterComponent = _classThis = /** @class */ (function (_super) {
        __extends(FooterComponent_1, _super);
        function FooterComponent_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FooterComponent_1.prototype.render = function () {
            return "<footer>Footer Content</footer>";
        };
        return FooterComponent_1;
    }(_classSuper));
    __setFunctionName(_classThis, "FooterComponent");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FooterComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FooterComponent = _classThis;
}();
var ContentComponent = function () {
    var _classDecorators = [TrackUsage];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = BaseComponent;
    var ContentComponent = _classThis = /** @class */ (function (_super) {
        __extends(ContentComponent_1, _super);
        function ContentComponent_1(dataSource) {
            var _this = _super.call(this) || this;
            _this.dataSource = dataSource;
            return _this;
        }
        ContentComponent_1.prototype.render = function () {
            var data = this.dataSource.fetchData();
            return "<main>".concat(data, "</main>");
        };
        return ContentComponent_1;
    }(_classSuper));
    __setFunctionName(_classThis, "ContentComponent");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContentComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContentComponent = _classThis;
}();
var TemplateManager = /** @class */ (function () {
    function TemplateManager() {
        this.templates = [
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
    }
    TemplateManager.prototype.getTemplates = function () {
        return this.templates;
    };
    TemplateManager.prototype.getTemplateByName = function (name) {
        return this.templates.find(function (template) { return template.name === name; });
    };
    return TemplateManager;
}());
// page-builder.ts
var PageBuilder = /** @class */ (function () {
    function PageBuilder(logger, templateManager) {
        this.components = [];
        this.logger = logger;
        this.templateManager = templateManager;
    }
    PageBuilder.prototype.selectTemplate = function (name) {
        this.selectedTemplate = this.templateManager.getTemplateByName(name);
        if (!this.selectedTemplate) {
            this.logger.error("Template not found: " + name);
            throw new ComponentError("Template not found");
        }
    };
    PageBuilder.prototype.addComponent = function (component) {
        this.components.push(component);
    };
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
        return templateLayout.replace(/{{(header|footer|content)}}/g, function (_, key) { return renderedComponents[key] || ''; });
    };
    return PageBuilder;
}());
// main.ts
var logger = new Logger();
var dataSource = isProduction ? new ApiDataSource() : new DatabaseDataSource();
var header = new HeaderComponent(dataSource, logger);
var footer = new FooterComponent();
var content = new ContentComponent(dataSource);
var templateManager = new TemplateManager();
var pageBuilder = new PageBuilder(logger, templateManager);
pageBuilder.selectTemplate('About Page Template');
pageBuilder.addComponent(header);
pageBuilder.addComponent(content);
pageBuilder.addComponent(footer);
console.log(pageBuilder.renderPage());
