import {Request, Response} from 'express-serve-static-core';
import {GET, Provide} from '../decorators/decorators';
import UserProvider from '../providers/User.provider';
import AuthProvider from '../providers/Auth.provider';

export class IndexController {

    constructor(
        @Provide('UserProvider') private UserProvider: UserProvider,
        @Provide('AuthProvider') private AuthProvider: AuthProvider
    ) {
        //
    }

    @GET('/')
    public index(req: Request, res: Response): void {
        this.UserProvider.logIndex();
        res.render('index', {title: 'Welcome'});
    }
}
