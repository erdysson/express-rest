import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import express from 'express';
import {Express} from 'express-serve-static-core';
import {UserController} from './routes/User.controller';
import {Server} from '../decorators/decorators';
import UserProvider from '../providers/User.provider';
import AuthProvider from '../providers/Auth.provider';
import TranslationController from './routes/Translation.controller';
import TranslationProvider from '../providers/Translation.provider';
import ConfigController from './routes/Config.controller';
import ConfigProvider from '../providers/Config.provider';

@Server({
    providers: [UserProvider, AuthProvider, TranslationProvider, ConfigProvider],
    controllers: [UserController, TranslationController, ConfigController],
    port: 8080
})
class S {

    constructor(app: Express) {
        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));
    }
}
