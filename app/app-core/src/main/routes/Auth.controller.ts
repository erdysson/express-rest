import {Request, Response} from 'express-serve-static-core';
import {POST, Provide} from '../../../../decorators/decorators';
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
            .then((user: IUserModel) =>
                this.AuthProvider.login(user)
                    .then((token: string) => res.json({token}))
                    .catch((error: Error) => {
                        console.log('can not create token', error);
                        res.sendStatus(500);
                    })
            )
            .catch(() => res.sendStatus(500));
    }

    @POST('/login')
    public doLogin(req: Request, res: Response): void {
        const {email, password} = req.body;
        this.UserProvider.getUserByEmail(email)
            .then((user: IUserModel) => {
                AuthService.validatePassword(password, user.password)
                    .then(() =>
                        this.AuthProvider.login(user)
                            .then((token: string) => res.json({token}))
                            .catch((error: Error) => {
                                console.log('can not create token', error);
                                res.sendStatus(500);
                            })
                    )
                    .catch(() => {
                        console.log('can not validate password', user);
                        res.sendStatus(405);
                    });
            })
            .catch((error: any) => {
                console.log('Can not find user', error);
                res.sendStatus(404);
            })
    }
}
