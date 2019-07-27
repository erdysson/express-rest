import {HttpMethod} from './decorator.enum';

export interface IServerConfig {
    controllers: Function[];
}

export interface IRouteHandler {
    path: string;
    className: string;
    method: string;
    httpMethod: HttpMethod;
}
