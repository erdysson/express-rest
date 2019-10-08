"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
class DecoratorsMetadata {
    static registerProvider(providerName, providedTo, index) {
        const controllerName = providedTo.name;
        if (!DecoratorsMetadata.controllers.has(controllerName)) {
            DecoratorsMetadata.controllers.set(controllerName, { providers: [], routeHandlers: new Map() });
        }
        DecoratorsMetadata.controllers.get(controllerName).providers.push({ name: providerName, index: index });
    }
    static registerRequestHandler(path, target, propertyKey, method) {
        const controllerName = target.constructor.name;
        if (!DecoratorsMetadata.controllers.has(controllerName)) {
            DecoratorsMetadata.controllers.set(controllerName, { providers: [], routeHandlers: new Map() });
        }
        if (!DecoratorsMetadata.controllers.get(controllerName).routeHandlers.has(propertyKey)) {
            DecoratorsMetadata.controllers.get(controllerName).routeHandlers.set(propertyKey, { path: path, className: target.constructor.name, method: propertyKey, httpMethod: method, authenticated: false });
        }
        else {
            const authenticated = DecoratorsMetadata.controllers.get(controllerName).routeHandlers.get(propertyKey).authenticated;
            DecoratorsMetadata.controllers.get(controllerName).routeHandlers.set(propertyKey, { path: path, className: target.constructor.name, method: propertyKey, httpMethod: method, authenticated: authenticated });
        }
    }
    static registerRequestHandlerAuthStatus(target, propertyKey, authenticated) {
        const controllerName = target.constructor.name;
        if (!DecoratorsMetadata.controllers.has(controllerName)) {
            DecoratorsMetadata.controllers.set(controllerName, { providers: [], routeHandlers: new Map() });
        }
        if (!DecoratorsMetadata.controllers.get(controllerName).routeHandlers.has(propertyKey)) {
            DecoratorsMetadata.controllers.get(controllerName).routeHandlers.set(propertyKey, { path: null, className: target.constructor.name, method: propertyKey, httpMethod: null, authenticated: true });
        }
        else {
            const { path, httpMethod } = DecoratorsMetadata.controllers.get(controllerName).routeHandlers.get(propertyKey);
            DecoratorsMetadata.controllers.get(controllerName).routeHandlers.set(propertyKey, { path: path, className: target.constructor.name, method: propertyKey, httpMethod: httpMethod, authenticated: authenticated });
        }
    }
    static initServer(target, config) {
        const app = express_1.default();
        const port = 3000;
        // initiate server class decorated by @Server
        const s = new target(app);
        app.set('port', port);
        // creation of provider instances
        config.providers.forEach((Provider) => DecoratorsMetadata.providerInstanceMap.set(Provider.name, new Provider()));
        // assignment of handlers to specified route paths
        config.controllers.forEach((Controller) => {
            const controllerName = Controller.name;
            if (DecoratorsMetadata.controllers.has(controllerName)) {
                const { providers, routeHandlers } = DecoratorsMetadata.controllers.get(controllerName);
                const providerInstances = providers
                    .sort((provider1, provider2) => provider1.index - provider2.index)
                    .map((provider) => DecoratorsMetadata.providerInstanceMap.get(provider.name));
                const instance = new Controller(...providerInstances);
                routeHandlers.forEach((routeHandler) => {
                    const httpMethod = routeHandler.httpMethod.valueOf().toString();
                    console.log(routeHandler.path, ', handled by', routeHandler.method, 'is authenticated :', routeHandler.authenticated);
                    app[httpMethod](routeHandler.path, (req, res, next) => instance[routeHandler.method].apply(instance, [req, res, next]));
                });
            }
        });
        // create server instance
        const server = http_1.default.createServer(app);
        server.on('error', (error) => {
            if (error.syscall !== 'listen') {
                throw error;
            }
            const bind = 'Port ' + port;
            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });
        server.on('listening', () => {
            const addr = server.address();
            const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
            console.log('Listening on ' + bind);
        });
        server.listen(port);
    }
}
DecoratorsMetadata.providerInstanceMap = new Map();
DecoratorsMetadata.controllers = new Map();
exports.default = DecoratorsMetadata;
