import {Request, Response, NextFunction, Express} from "express-serve-static-core";
import express from 'express';
import http from 'http';
import path from 'path';
import {IControllerConfig, IProviderConfig, IRouteHandler, IServerConfig} from './decorator.interface';
import {HttpMethod} from './decorator.enum';
import FileService from '../app-core/src/main/services/File.service';
import jwt, {VerifyOptions} from 'jsonwebtoken';

class DecoratorsMetadata {

    private static providerInstanceMap: Map<string, object> = new Map<string, object>();

    private static controllers: Map<string, IControllerConfig> = new Map<string, IControllerConfig>();

    private static publicKey: string;

    private static getPublicKey(): Promise<string> {
        if (DecoratorsMetadata.publicKey) {
            return Promise.resolve(DecoratorsMetadata.publicKey);
        }
        const filePath: string = path.join(__dirname, '../security/public.key');
        return new FileService().read(filePath)
            .then((publicKey: string) => {
                DecoratorsMetadata.publicKey = publicKey;
                return DecoratorsMetadata.publicKey;
            });
    }

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
        // initiate server class decorated by @Server
        const s = new (target as ObjectConstructor)(app);
        app.set('port', config.port);
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
                    (app as any)[httpMethod](
                        routeHandler.path,
                        (req: Request, res: Response, next: NextFunction) => {
                            const authPromise: Promise<void> = new Promise<void>((resolve, reject) => {
                                if (routeHandler.authenticated) {
                                    console.log('auth filter is protecting registered path :', routeHandler.path);
                                    const authHeader: string = req.headers.authorization;
                                    const token: string = authHeader ? (authHeader.startsWith('Bearer') ? authHeader.substring(7, authHeader.length) : null): null;
                                    if (!authHeader) {
                                        reject();
                                    } else {
                                        DecoratorsMetadata.getPublicKey()
                                            .then((publicKey: string) => {
                                                try {
                                                    const verifyOptions: VerifyOptions = {
                                                        algorithms: ['RS256']
                                                    };
                                                    const legit = jwt.verify(token, publicKey, verifyOptions);
                                                    console.log('auth toke is verified', legit);
                                                    resolve();
                                                } catch (e) {
                                                    console.log('can not verify the token', e);
                                                    reject();
                                                }
                                            });
                                    }
                                } else {
                                    resolve();
                                }
                            });
                            authPromise
                                .then(() => instance[routeHandler.method].apply(instance, [req, res, next]))
                                .catch(() => res.sendStatus(401));
                        }
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
            const bind = 'Port ' + config.port;
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
        server.listen(config.port);
    }
}

export default DecoratorsMetadata;
