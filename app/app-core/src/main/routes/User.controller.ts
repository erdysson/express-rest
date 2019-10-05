import {Request, Response} from 'express-serve-static-core';
import {Authenticated, POST, Provide} from '../../../../decorators/decorators';
import UserProvider from '../providers/User.provider';
import {IUserModel} from '../interfaces/models.interface';
import AuthProvider from '../providers/Auth.provider';

export class UserController {

    constructor(
        @Provide('AuthProvider') private AuthProvider: AuthProvider,
        @Provide('UserProvider') private UserProvider: UserProvider
    ) {
        //
    }

    @Authenticated()
    @POST('/users')
    public getUsers(req: Request, res: Response): void {
        this.UserProvider.getUsers()
            .then((users: IUserModel[]) => res.json({users}))
            .catch((e) => res.sendStatus(500));
    }
}
