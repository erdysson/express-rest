import {HttpMethod} from './decorator.enum';

export type Class<T> = new (...args: any[]) => T;

export interface IServer {
    port: number;
    onListening: () => void;
    onError: (error: any) => void;
}

export interface IServerConfig {
    controllers: Function[];
    providers: Function[];
    port: number;
}

export interface IRouteHandler {
    path: string;
    className: string;
    method: string;
    httpMethod: HttpMethod;
    authenticated: boolean;
}

export interface IProviderConfig {
    name: string;
    index: number;
}

export interface IControllerConfig {
    providers: IProviderConfig[];
    routeHandlers: Map<string, IRouteHandler>;
}
