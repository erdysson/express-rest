import {IndexController} from './routes/Index.controller';
import {LoginController} from './routes/Login.controller';
import {UserController} from './routes/User.controller';
import {Server} from './decorators/decorators';

@Server({
  controllers: [IndexController, LoginController, UserController]
})
class S {
  constructor() {
    console.log('server instance is created');
  }
}

const s = new S();
