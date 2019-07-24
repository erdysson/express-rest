import {Request, Response} from 'express-serve-static-core';
import {GET, POST} from '../decorators/decorators';

export class LoginController {

    @GET('/login')
    public getLoginPage(req: Request, res: Response): void {
        res.render('login', {title: 'Login'});
    }

    @POST('/login')
    public doLogin(req: Request, res: Response): void {
        res.json({message: 'hello world'});
    }
}
