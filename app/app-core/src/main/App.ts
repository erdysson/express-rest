import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import express from 'express';
import {Express} from 'express-serve-static-core';
import {IndexController} from './routes/Index.controller';
import {LoginController} from './routes/Login.controller';
import {UserController} from './routes/User.controller';
import {Server} from '../../../../lib/decorators/decorators';
import UserProvider from './providers/User.provider';
import AuthProvider from './providers/Auth.provider';
import TranslationController from './routes/Translation.controller';
import TranslationProvider from './providers/Translation.provider';
import ConfigController from './routes/Config.controller';
import ConfigProvider from './providers/Config.provider';

@Server({
  providers: [UserProvider, AuthProvider, TranslationProvider, ConfigProvider],
  controllers: [IndexController, LoginController, UserController, TranslationController, ConfigController]
})
class S {

  constructor(app: Express) {
    // view engine setup
    app.set('views', path.join(process.cwd(), 'src/main/views'));
    app.set('view engine', 'hbs');
    // middleware setup
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(process.cwd(), 'src/main/public')));
  }
}
