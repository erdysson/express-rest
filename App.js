"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const Index_controller_1 = require("./routes/Index.controller");
const Login_controller_1 = require("./routes/Login.controller");
const User_controller_1 = require("./routes/User.controller");
const decorators_1 = require("./decorators/decorators");
const User_provider_1 = __importDefault(require("./providers/User.provider"));
const Auth_provider_1 = __importDefault(require("./providers/Auth.provider"));
const Translation_controller_1 = __importDefault(require("./routes/Translation.controller"));
const Translation_provider_1 = __importDefault(require("./providers/Translation.provider"));
const Config_controller_1 = __importDefault(require("./routes/Config.controller"));
const Config_provider_1 = __importDefault(require("./providers/Config.provider"));
let S = class S {
    constructor(app) {
        // view engine setup
        app.set('views', path_1.default.join(process.cwd(), 'views'));
        app.set('view engine', 'hbs');
        // middleware setup
        app.use(morgan_1.default('dev'));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(cookie_parser_1.default());
        app.use(express_1.default.static(path_1.default.join(process.cwd(), 'public')));
        // catch 404 and forward to error handler
        // app.use((req: Request, res: Response, next: NextFunction) => next(createHttpError(404)));
        // error handler
        // app.use((err: any, req: Request, res: Response) => {
        //   // set locals, only providing error in development
        //   res.locals.message = err.message;
        //   res.locals.error = req.app.get('env') === 'development' ? err : {};
        //   // render the error page
        //   res.status(err.status || 500);
        //   res.render('error');
        // });
        console.log('server instance is created');
    }
};
S = __decorate([
    decorators_1.Server({
        providers: [User_provider_1.default, Auth_provider_1.default, Translation_provider_1.default, Config_provider_1.default],
        controllers: [Index_controller_1.IndexController, Login_controller_1.LoginController, User_controller_1.UserController, Translation_controller_1.default, Config_controller_1.default]
    }),
    __metadata("design:paramtypes", [Function])
], S);
