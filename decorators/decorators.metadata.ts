import {Request, Response, NextFunction, Express} from "express-serve-static-core";
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createHttpError from 'http-errors';
import http from 'http';
import {IRouteHandler, IServerConfig} from './decorator.interface';


class DecoratorsMetadata {
    private static controllerMap: Map<string, IRouteHandler[]> = new Map<string, IRouteHandler[]>();

    public static registerRequestHandler(path: string, target: Object, propertyKey: string, method: string) {
        const controllerName: string = target.constructor.name;
        if (!DecoratorsMetadata.controllerMap.has(controllerName)) {
            DecoratorsMetadata.controllerMap.set(controllerName, []);
        }
        DecoratorsMetadata.controllerMap.get(controllerName).push({path: path, className: target.constructor.name, method: propertyKey, httpMethod: method});
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
        // assignment of handlers to specified route paths
        config.controllers.forEach((Controller: Function) => {
            const controllerName: string = Controller.name;
            const instance: any = new (Controller as FunctionConstructor)();
            if (DecoratorsMetadata.controllerMap.has(controllerName)) {
                const requestHandlers: IRouteHandler[] = DecoratorsMetadata.controllerMap.get(controllerName);
                requestHandlers.forEach((requestHandler: IRouteHandler) =>
                    (app as any)[requestHandler.httpMethod](requestHandler.path, instance[requestHandler.method]));
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
