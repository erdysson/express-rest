import DecoratorsMetadata from './decorators.metadata';
import {IServerConfig} from './decorator.interface';
import {HttpMethod} from './decorator.enum';

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

export const Server = (config: IServerConfig) => (target: Function) => {
    DecoratorsMetadata.initServer(target, config);
};
