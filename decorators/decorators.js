"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_metadata_1 = __importDefault(require("./decorators.metadata"));
const decorator_enum_1 = require("./decorator.enum");
// http methods
exports.GET = (path = '') => (target, propertyKey, descriptor) => {
    decorators_metadata_1.default.registerRequestHandler(path, target, propertyKey, decorator_enum_1.HttpMethod.GET);
};
exports.POST = (path = '') => (target, propertyKey, descriptor) => {
    decorators_metadata_1.default.registerRequestHandler(path, target, propertyKey, decorator_enum_1.HttpMethod.POST);
};
exports.PUT = (path = '') => (target, propertyKey, descriptor) => {
    decorators_metadata_1.default.registerRequestHandler(path, target, propertyKey, decorator_enum_1.HttpMethod.PUT);
};
exports.DELETE = (path = '') => (target, propertyKey, descriptor) => {
    decorators_metadata_1.default.registerRequestHandler(path, target, propertyKey, decorator_enum_1.HttpMethod.DELETE);
};
// providers
exports.Provide = (name) => (target, propertyKey, parameterIndex) => {
    decorators_metadata_1.default.registerProvider(name, target, parameterIndex);
};
// security
exports.Authenticated = (auth = true) => (target, propertyKey, descriptor) => {
    decorators_metadata_1.default.registerRequestHandlerAuthStatus(target, propertyKey, auth);
};
// server configuration
exports.Server = (config) => (target) => {
    decorators_metadata_1.default.initServer(target, config);
};
