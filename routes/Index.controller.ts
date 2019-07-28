import {Request, Response} from 'express-serve-static-core';
import {GET} from '../decorators/decorators';

export class IndexController {

    constructor() {
        //
    }

    @GET('/')
    public index(req: Request, res: Response): void {
        res.render('index', {title: 'Welcome'});
    }
}
