import {Request, Response} from 'express-serve-static-core';
import {GET, POST, Provide} from '../../core/decorators/decorators';
import UserProvider from '../providers/User.provider';
import AuthProvider from '../providers/Auth.provider';

export class LoginController {

    constructor(
        @Provide('UserProvider') private UserProvider: UserProvider,
        @Provide('AuthProvider') private AuthProvider: AuthProvider
    ) {
        //
    }

    @GET('/login')
    public getLoginPage(req: Request, res: Response): void {
        res.render('login', {title: 'Login'});
    }

    @POST('/login')
    public doLogin(req: Request, res: Response): void {
        res.json({message: 'hello world'});
    }
}
