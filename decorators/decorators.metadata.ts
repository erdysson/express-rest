import {Request, Response, NextFunction, Express} from "express-serve-static-core";
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createHttpError from 'http-errors';
import http from 'http';
import {IControllerConfig, IProviderConfig, IRouteHandler, IServerConfig} from './decorator.interface';
import {HttpMethod} from './decorator.enum';


class DecoratorsMetadata {
    private static providerInstanceMap: Map<string, object> = new Map<string, object>();

    private static controllerMap: Map<string, IControllerConfig> = new Map<string, IControllerConfig>();

    public static registerProvider(providerName: string, providedTo: Function, index: number): void {
        const controllerName: string = providedTo.name;
        if (!DecoratorsMetadata.controllerMap.has(controllerName)) {
            DecoratorsMetadata.controllerMap.set(controllerName, {providers: [], routeHandlers: []});
        }
        DecoratorsMetadata.controllerMap.get(controllerName).providers.push({name: providerName, index: index});
    }

    public static registerRequestHandler(path: string, target: Object, propertyKey: string, method: HttpMethod) {
        const controllerName: string = target.constructor.name;
        if (!DecoratorsMetadata.controllerMap.has(controllerName)) {
            DecoratorsMetadata.controllerMap.set(controllerName, {providers: [], routeHandlers: []});
        }
        DecoratorsMetadata.controllerMap.get(controllerName).routeHandlers.push({path: path, className: target.constructor.name, method: propertyKey, httpMethod: method});
    }

    public static initServer(target: Function, config: IServerConfig): void {
        const app: Express = express();
        // view engine setup
        app.set('views', path.join(process.cwd(), 'views'));
        app.set('view engine', 'hbs');

        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        app.use(cookieParser());
        app.use(express.static(path.join(process.cwd(), 'public')));
        // creation of provider instances
        config.providers.forEach((Provider: Function) =>
            DecoratorsMetadata.providerInstanceMap.set(Provider.name, new (Provider as ObjectConstructor)()));
        // assignment of handlers to specified route paths
        config.controllers.forEach((Controller: Function) => {
            const controllerName: string = Controller.name;
            if (DecoratorsMetadata.controllerMap.has(controllerName)) {
                const {providers, routeHandlers} = DecoratorsMetadata.controllerMap.get(controllerName);
                const providerInstances: object[] = providers
                    .sort((provider1: IProviderConfig, provider2: IProviderConfig) => provider1.index - provider2.index)
                    .map((provider: IProviderConfig) => DecoratorsMetadata.providerInstanceMap.get(provider.name));
                const instance: any = new (Controller as ObjectConstructor)(...providerInstances);
                routeHandlers.forEach((requestHandler: IRouteHandler) =>
                    (app as any)[requestHandler.httpMethod.valueOf().toString()](requestHandler.path, (instance[requestHandler.method] as Function).bind(instance)));
            }
        });
        // catch 404 and forward to error handler
        app.use((req: Request, res: Response, next: NextFunction) => next(createHttpError(404)));
        // error handler
        app.use(function(err: any, req: Request, res: Response) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });

        /**
         * Get port from environment and store in Express.
         */
        const port: number = 3000;
        app.set('port', port);
        /**
         * Create HTTP server.
         */
        const server: http.Server = http.createServer(app);
        /**
         * Listen on provided port, on all network interfaces.
         */
        server.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);

        function onError(error: any) {
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
        }

        function onListening() {
            const addr = server.address();
            const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
            console.log('Listening on ' + bind);
        }
    }
}

export default DecoratorsMetadata;
