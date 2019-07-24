import DecoratorsMetadata from './decorators.metadata';
import {IServerConfig} from './decorator.interface';

export const GET = (path: string = '') => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    DecoratorsMetadata.registerRequestHandler(path, target, propertyKey, 'get');
};

export const POST = (path: string = '') => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    DecoratorsMetadata.registerRequestHandler(path, target, propertyKey, 'post');
};

export const Server = (config: IServerConfig) => (target: Function) => {
    DecoratorsMetadata.initServer(target, config);
};
