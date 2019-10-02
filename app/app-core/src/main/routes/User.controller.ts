import {Request, Response} from 'express-serve-static-core';
import {Authenticated, GET, POST, Provide} from '../../../../../lib/decorators/decorators';
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
    @GET('/users')
    public getUsers(req: Request, res: Response): void {
        try {
            const authHeader: string = req.headers.authorization;
            const token: string = authHeader ? (authHeader.startsWith('Bearer') ? authHeader.substring(7, authHeader.length) : null): null;
            console.log('token', token);
            if (!authHeader) {
                res.sendStatus(403);
            } else {
                this.AuthProvider.authorize(token)
                    .then(() => {
                        this.UserProvider.getUsers()
                            .then((users: IUserModel[]) => res.json({users}))
                            .catch((e) => res.sendStatus(500));
                    })
                    .catch(() => {
                        console.log('failed to authorize user');
                        res.sendStatus(403);
                    });
            }
        } catch (e) {
            res.sendStatus(500);
        }
    }

    @Authenticated()
    @POST('/user/create')
    public createUser(req: Request, res: Response): void {
        try {
            res.json({success: true});
        } catch (e) {
            res.sendStatus(500);
        }
    }
}
