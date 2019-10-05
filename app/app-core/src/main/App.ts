import path from 'path';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logger from 'morgan';
import express from 'express';
import {Express} from 'express-serve-static-core';
import {Server} from '../decorators/decorators';
import UserProvider from '../providers/User.provider';
import AuthProvider from '../providers/Auth.provider';
import ConfigProvider from '../providers/Config.provider';
import {UserController} from './routes/User.controller';
import TranslationController from './routes/Translation.controller';
import TranslationProvider from '../providers/Translation.provider';
import ConfigController from './routes/Config.controller';

@Server({
    providers: [UserProvider, AuthProvider, TranslationProvider, ConfigProvider],
    controllers: [UserController, TranslationController, ConfigController],
    port: 8080
})
class S {

    constructor(app: Express) {
        app.use(compression());
        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));
    }
}
