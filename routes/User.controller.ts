import {Request, Response} from 'express-serve-static-core';
import {GET} from '../decorators/decorators';

export class UserController {

    @GET('/users')
    public getUsers(req: Request, res: Response): void {
        res.json({users: [1, 2, 3, 4]});
    }
}
