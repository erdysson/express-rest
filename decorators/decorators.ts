import DecoratorsMetadata from './decorators.metadata';
import {IServerConfig} from './decorator.interface';
import {HttpMethod} from './decorator.enum';

// http methods
export const GET = (path: string = '') => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    DecoratorsMetadata.registerRequestHandler(path, target, propertyKey, HttpMethod.GET);
};

export const POST = (path: string = '') => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    DecoratorsMetadata.registerRequestHandler(path, target, propertyKey, HttpMethod.POST);
};

export const PUT = (path: string = '') => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    DecoratorsMetadata.registerRequestHandler(path, target, propertyKey, HttpMethod.PUT);
};

export const DELETE = (path: string = '') => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    DecoratorsMetadata.registerRequestHandler(path, target, propertyKey, HttpMethod.DELETE);
};

// providers
export const Provide = (name: string) => (target: Function, propertyKey: string, parameterIndex: number) => {
    DecoratorsMetadata.registerProvider(name, target, parameterIndex);
};

// security
export const Authenticated = (auth: boolean = true) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    DecoratorsMetadata.registerRequestHandlerAuthStatus(target, propertyKey, auth);
};

// server configuration
export const Server = (config: IServerConfig) => (target: Function) => {
    DecoratorsMetadata.initServer(target, config);
};
