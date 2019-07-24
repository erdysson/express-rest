import {Request, Response} from 'express-serve-static-core';

/* GET users listing. */
const users = (req: Request, res: Response) =>
  res.render('index', {title: 'Users'});

export default users;
