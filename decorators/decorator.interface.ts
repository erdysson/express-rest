import {HttpMethod} from './decorator.enum';

export interface IServerConfig {
    controllers: Function[];
    providers: Function[];
}

export interface IRouteHandler {
    path: string;
    className: string;
    method: string;
    httpMethod: HttpMethod;
}

export interface IProviderConfig {
    name: string;
    index: number;
}

export interface IControllerConfig {
    providers: IProviderConfig[];
    routeHandlers: IRouteHandler[];
}
