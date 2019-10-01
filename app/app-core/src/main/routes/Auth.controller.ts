import {Request, Response} from 'express-serve-static-core';
import {POST, Provide} from '../../../../../lib/decorators/decorators';
import UserProvider from '../providers/User.provider';
import AuthProvider from '../providers/Auth.provider';
import {IUserModel} from '../interfaces/models.interface';
import AuthService from '../services/Auth.service';

export class AuthController {

    constructor(
        @Provide('UserProvider') private UserProvider: UserProvider,
        @Provide('AuthProvider') private AuthProvider: AuthProvider
    ) {
        //
    }

    @POST('/signup')
    public signUp(req: Request, res: Response): void {
        const {email, password, name, lastName} = req.body;
        this.UserProvider.createUser(email, password, name, lastName)
            .then((user: IUserModel) => {
                // set the jwt and return data
                res.json({message: 'sign up success', token: 'token'});
            })
            .catch(() => res.status(500));
    }

    @POST('/login')
    public doLogin(req: Request, res: Response): void {
        const {email, password} = req.body;
        this.UserProvider.getUserByLoginData(email, password)
            .then((user: IUserModel) => {
                AuthService.validatePassword(password, user.password)
                    .then(() => {
                        // set the jwt and return data
                        console.log('login success', user);
                        res.json({message: 'login success', token: 'token'});
                    })
                    .catch(() => {
                        console.log('can not validate password', user);
                        res.status(405);
                    });
            })
            .catch((error: any) => {
                console.log('Can not find user', error);
            })
    }
}
