import {Request, Response} from 'express-serve-static-core';
import {Authenticated, GET, POST, Provide} from '../../core/decorators/decorators';
import UserProvider from '../providers/User.provider';

export class UserController {

    constructor(
        @Provide('UserProvider') private UserProvider: UserProvider
    ) {
        //
    }

    @Authenticated()
    @GET('/users')
    public getUsers(req: Request, res: Response): void {
        try {
            res.json({users: [1, 2, 3, 4]});
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
