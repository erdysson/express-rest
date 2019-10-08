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
const Config_provider_1 = __importDefault(require("../providers/Config.provider"));
let ConfigController = class ConfigController {
    constructor(ConfigProvider) {
        this.ConfigProvider = ConfigProvider;
    }
    getProductConfig(req, res) {
        try {
            const branchCode = req.body.branchCode;
            this.ConfigProvider.getProductConfig(branchCode)
                .then((translation) => res.json(translation))
                .catch(() => res.sendStatus(500));
        }
        catch (e) {
            res.sendStatus(404);
        }
    }
};
__decorate([
    decorators_1.Authenticated(),
    decorators_1.POST('/product'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ConfigController.prototype, "getProductConfig", null);
ConfigController = __decorate([
    __param(0, decorators_1.Provide('ConfigProvider')),
    __metadata("design:paramtypes", [Config_provider_1.default])
], ConfigController);
exports.default = ConfigController;
