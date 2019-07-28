import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createHttpError from 'http-errors';
import express from 'express';
import http from 'http';
import {Request, Response, NextFunction, Express} from "express-serve-static-core";
import {IndexController} from './routes/Index.controller';
import {LoginController} from './routes/Login.controller';
import {UserController} from './routes/User.controller';
import {Server} from './decorators/decorators';
import UserProvider from './providers/User.provider';
import AuthProvider from './providers/Auth.provider';

@Server({
  providers: [UserProvider, AuthProvider],
  controllers: [IndexController, LoginController, UserController]
})
class S {
  private port: number = 3000;
  private server: http.Server;

  constructor(app: Express) {
    // view engine setup
    app.set('views', path.join(process.cwd(), 'views'));
    app.set('view engine', 'hbs');
    // middleware setup
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(process.cwd(), 'public')));
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

    app.set('port', this.port);

    this.server = http.createServer(app);
    /**
     * Listen on provided port, on all network interfaces.
     */
    this.server.listen(this.port);
    this.server.on('error', this.onError.bind(this));
    this.server.on('listening', this.onListening.bind(this));

    console.log('server instance is created');
  }

  private onError(error: any) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = 'Port ' + this.port;

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

  private onListening() {
    const addr = this.server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
  }
}
