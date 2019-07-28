import {Request, Response} from 'express-serve-static-core';
import {GET, Provide} from '../decorators/decorators';
import UserProvider from '../providers/User.provider';

export class UserController {

    constructor(
        @Provide('UserProvider') private UserProvider: UserProvider
    ) {
        //
    }

    @GET('/users')
    public getUsers(req: Request, res: Response): void {
        res.json({users: [1, 2, 3, 4]});
    }
}
