import {Request, Response} from 'express-serve-static-core';

/* GET home page. */
const index = (req: Request, res: Response) =>
    res.render('index', {title: 'Home fucker'});

export default index;
