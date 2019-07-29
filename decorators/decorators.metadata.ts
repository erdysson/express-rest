import {Request, Response, NextFunction, Express} from "express-serve-static-core";
import express from 'express';
import http from "http";
import {IControllerConfig, IProviderConfig, IRouteHandler, IServerConfig} from './decorator.interface';
import {HttpMethod} from './decorator.enum';

class DecoratorsMetadata {
    private static providerInstanceMap: Map<string, object> = new Map<string, object>();

    private static controllers: Map<string, IControllerConfig> = new Map<string, IControllerConfig>();

    public static registerProvider(providerName: string, providedTo: Function, index: number): void {
        const controllerName: string = providedTo.name;
        if (!DecoratorsMetadata.controllers.has(controllerName)) {
            DecoratorsMetadata.controllers.set(controllerName, {providers: [], routeHandlers: new Map<string, IRouteHandler>()});
        }
        DecoratorsMetadata.controllers.get(controllerName).providers.push({name: providerName, index: index});
    }

    public static registerRequestHandler(path: string, target: Object, propertyKey: string, method: HttpMethod) {
        const controllerName: string = target.constructor.name;
        if (!DecoratorsMetadata.controllers.has(controllerName)) {
            DecoratorsMetadata.controllers.set(controllerName, {providers: [], routeHandlers: new Map<string, IRouteHandler>()});
        }

        if (!DecoratorsMetadata.controllers.get(controllerName).routeHandlers.has(propertyKey)) {
            DecoratorsMetadata.controllers.get(controllerName).routeHandlers.set(propertyKey, {path: path, className: target.constructor.name, method: propertyKey, httpMethod: method, authenticated: false});
        } else {
            const authenticated: boolean = DecoratorsMetadata.controllers.get(controllerName).routeHandlers.get(propertyKey).authenticated;
            DecoratorsMetadata.controllers.get(controllerName).routeHandlers.set(propertyKey, {path: path, className: target.constructor.name, method: propertyKey, httpMethod: method, authenticated: authenticated});
        }
    }

    public static registerRequestHandlerAuthStatus(target: Object, propertyKey: string, authenticated: boolean) {
        const controllerName: string = target.constructor.name;
        if (!DecoratorsMetadata.controllers.has(controllerName)) {
            DecoratorsMetadata.controllers.set(controllerName, {providers: [], routeHandlers: new Map<string, IRouteHandler>()});
        }

        if (!DecoratorsMetadata.controllers.get(controllerName).routeHandlers.has(propertyKey)) {
            DecoratorsMetadata.controllers.get(controllerName).routeHandlers.set(propertyKey, {path: null, className: target.constructor.name, method: propertyKey, httpMethod: null, authenticated: true});
        } else {
            const {path, httpMethod} = DecoratorsMetadata.controllers.get(controllerName).routeHandlers.get(propertyKey);
            DecoratorsMetadata.controllers.get(controllerName).routeHandlers.set(propertyKey, {path: path, className: target.constructor.name, method: propertyKey, httpMethod: httpMethod, authenticated: authenticated});
        }
    }

    public static initServer(target: Function, config: IServerConfig): void {
        const app: Express = express();
        const port: number = 3000;
        // initiate server class decorated by @Server
        const s = new (target as ObjectConstructor)(app);
        app.set('port', port);
        // creation of provider instances
        config.providers.forEach((Provider: Function) =>
            DecoratorsMetadata.providerInstanceMap.set(Provider.name, new (Provider as ObjectConstructor)()));
        // assignment of handlers to specified route paths
        config.controllers.forEach((Controller: Function) => {
            const controllerName: string = Controller.name;
            if (DecoratorsMetadata.controllers.has(controllerName)) {
                const {providers, routeHandlers} = DecoratorsMetadata.controllers.get(controllerName);
                const providerInstances: object[] = providers
                    .sort((provider1: IProviderConfig, provider2: IProviderConfig) => provider1.index - provider2.index)
                    .map((provider: IProviderConfig) => DecoratorsMetadata.providerInstanceMap.get(provider.name));
                const instance: any = new (Controller as ObjectConstructor)(...providerInstances);
                routeHandlers.forEach((routeHandler: IRouteHandler) => {
                    const httpMethod: string = routeHandler.httpMethod.valueOf().toString();
                    console.log(routeHandler.path, ', handled by', routeHandler.method, 'is authenticated :', routeHandler.authenticated);
                    (app as any)[httpMethod](routeHandler.path, (req: Request, res: Response, next: NextFunction) =>
                        instance[routeHandler.method].apply(instance, [req, res, next])
                    );
                });
            }
        });
        // create server instance
        const server: http.Server = http.createServer(app);
        server.on('error', (error: any) => {
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

export default DecoratorsMetadata;
