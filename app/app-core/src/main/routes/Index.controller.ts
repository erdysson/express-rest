import {Request, Response} from 'express-serve-static-core';
import {GET} from '../../../../../lib/decorators/decorators';

export class IndexController {

    constructor() {
        //
    }

    @GET('/')
    public index(req: Request, res: Response): void {
        try {
            res.render('index', {title: 'Welcome'});
        } catch (e) {
            res.sendStatus(500);
        }
    }
}
