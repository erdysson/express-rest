import {Request, Response} from 'express-serve-static-core';
import {Authenticated, POST, Provide} from '../../decorators/decorators';
import UserProvider from '../../providers/User.provider';
import {IUserModel} from '../../interfaces/models.interface';
import AuthProvider from '../../providers/Auth.provider';
import AuthService from '../../services/Auth.service';
import {StatusCode} from '../../enums/StatusCode.enum';

export class UserController {

    constructor(
        @Provide('AuthProvider') private AuthProvider: AuthProvider,
        @Provide('UserProvider') private UserProvider: UserProvider
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
                        res.sendStatus(StatusCode.INTERNAL_SERVER_ERROR);
                    })
            )
            .catch(() => res.sendStatus(StatusCode.BAD_REQUEST));
    }

    @POST('/login')
    public login(req: Request, res: Response): void {
        const {email, password} = req.body;
        this.UserProvider.getUserByEmail(email)
            .then((user: IUserModel) =>
                AuthService.validatePassword(password, user.password)
                    .then(() =>
                        this.AuthProvider.login(user)
                            .then((token: string) => res.json({token}))
                            .catch((error: Error) => {
                                console.log('can not create token', error);
                                res.sendStatus(StatusCode.INTERNAL_SERVER_ERROR);
                            })
                    )
                    .catch(() => {
                        console.log('can not validate password', user);
                        res.sendStatus(StatusCode.BAD_REQUEST);
                    })
            )
            .catch((error: any) => {
                console.log('Can not find user', error);
                res.sendStatus(StatusCode.NOT_FOUND);
            });
    }

    @Authenticated()
    @POST('/users')
    public getUsers(req: Request, res: Response): void {
        this.UserProvider.getUsers()
            .then((users: IUserModel[]) => res.json({users}))
            .catch((e) => res.sendStatus(StatusCode.INTERNAL_SERVER_ERROR));
    }
}
