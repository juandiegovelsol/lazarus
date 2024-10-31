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
// TrackUsage decorator
function TrackUsage(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("Rendering ".concat(target.constructor.name, "..."));
        return originalMethod.apply(this, args);
    };
    return descriptor;
}
// Middleware pipeline
var MiddlewarePipeline = /** @class */ (function () {
    function MiddlewarePipeline() {
        this.middleware = [];
    }
    MiddlewarePipeline.prototype.addMiddleware = function (middleware) {
        this.middleware.push(middleware);
    };
    MiddlewarePipeline.prototype.process = function (data) {
        var result = data;
        for (var _i = 0, _a = this.middleware; _i < _a.length; _i++) {
            var middleware = _a[_i];
            result = middleware.process(result);
        }
        return result;
    };
    return MiddlewarePipeline;
}());
// Updated HeaderComponent
var HeaderComponent = function () {
    var _classDecorators = [TrackUsage];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HeaderComponent = _classThis = /** @class */ (function () {
        function HeaderComponent_1(dataSource, logger) {
            this.dataSource = dataSource;
            this.logger = logger;
            this.middlewarePipeline = new MiddlewarePipeline();
        }
        HeaderComponent_1.prototype.init = function () {
            this.middlewarePipeline.addMiddleware(new UpperCaseMiddleware());
        };
        HeaderComponent_1.prototype.render = function () {
            try {
                var data = this.dataSource.fetchData();
                var processedData = this.middlewarePipeline.process(data);
                this.logger.log("Rendering header with data: ".concat(processedData));
                return "<header>".concat(processedData, "</header>");
            }
            catch (error) {
                this.logger.log("Error rendering header: ".concat(error.message));
                return "<div>Error rendering header: ".concat(error.message, "</div>");
            }
        };
        HeaderComponent_1.prototype.destroy = function () {
            // Clean up resources
        };
        return HeaderComponent_1;
    }());
    __setFunctionName(_classThis, "HeaderComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeaderComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeaderComponent = _classThis;
}();
// Updated PageBuilder
var PageBuilder = /** @class */ (function () {
    function PageBuilder() {
        this.components = [];
    }
    PageBuilder.prototype.addComponent = function (component) {
        this.components.push(component);
    };
    PageBuilder.prototype.renderPage = function () {
        var renderedContent = '';
        for (var _i = 0, _a = this.components; _i < _a.length; _i++) {
            var component = _a[_i];
            component.init();
            renderedContent += component.render() + '\n';
            component.destroy();
        }
        return renderedContent + ' (end of page)';
    };
    return PageBuilder;
}());
// Usage
var dataSource = new ApiDataSource();
var logger = new Logger();
var header = new HeaderComponent(dataSource, logger);
var pageBuilder = new PageBuilder();
pageBuilder.addComponent(header);
console.log(pageBuilder.renderPage());
