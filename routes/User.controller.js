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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../decorators/decorators");
const User_provider_1 = __importDefault(require("../providers/User.provider"));
let UserController = class UserController {
    constructor(UserProvider) {
        this.UserProvider = UserProvider;
        //
    }
    getUsers(req, res) {
        try {
            res.json({ users: [1, 2, 3, 4] });
        }
        catch (e) {
            res.sendStatus(500);
        }
    }
    createUser(req, res) {
        try {
            res.json({ success: true });
        }
        catch (e) {
            res.sendStatus(500);
        }
    }
};
__decorate([
    decorators_1.Authenticated(),
    decorators_1.GET('/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    decorators_1.Authenticated(),
    decorators_1.POST('/user/create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
UserController = __decorate([
    __param(0, decorators_1.Provide('UserProvider')),
    __metadata("design:paramtypes", [User_provider_1.default])
], UserController);
exports.UserController = UserController;
