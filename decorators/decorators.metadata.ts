import {Express} from "express-serve-static-core";
import express from 'express';
import {IControllerConfig, IProviderConfig, IRouteHandler, IServerConfig} from './decorator.interface';
import {HttpMethod} from './decorator.enum';


class DecoratorsMetadata {
    private static providerInstanceMap: Map<string, object> = new Map<string, object>();

    private static controllerMap: Map<string, IControllerConfig> = new Map<string, IControllerConfig>();

    public static registerProvider(providerName: string, providedTo: Function, index: number): void {
        const controllerName: string = providedTo.name;
        if (!DecoratorsMetadata.controllerMap.has(controllerName)) {
            DecoratorsMetadata.controllerMap.set(controllerName, {providers: [], routeHandlers: []});
        }
        DecoratorsMetadata.controllerMap.get(controllerName).providers.push({name: providerName, index: index});
    }

    public static registerRequestHandler(path: string, target: Object, propertyKey: string, method: HttpMethod) {
        const controllerName: string = target.constructor.name;
        if (!DecoratorsMetadata.controllerMap.has(controllerName)) {
            DecoratorsMetadata.controllerMap.set(controllerName, {providers: [], routeHandlers: []});
        }
        DecoratorsMetadata.controllerMap.get(controllerName).routeHandlers.push({path: path, className: target.constructor.name, method: propertyKey, httpMethod: method});
    }

    public static initServer(target: Function, config: IServerConfig): void {
        const app: Express = express();
        // creation of provider instances
        config.providers.forEach((Provider: Function) =>
            DecoratorsMetadata.providerInstanceMap.set(Provider.name, new (Provider as ObjectConstructor)()));
        // assignment of handlers to specified route paths
        config.controllers.forEach((Controller: Function) => {
            const controllerName: string = Controller.name;
            if (DecoratorsMetadata.controllerMap.has(controllerName)) {
                const {providers, routeHandlers} = DecoratorsMetadata.controllerMap.get(controllerName);
                const providerInstances: object[] = providers
                    .sort((provider1: IProviderConfig, provider2: IProviderConfig) => provider1.index - provider2.index)
                    .map((provider: IProviderConfig) => DecoratorsMetadata.providerInstanceMap.get(provider.name));
                const instance: any = new (Controller as ObjectConstructor)(...providerInstances);
                routeHandlers.forEach((requestHandler: IRouteHandler) =>
                    (app as any)[requestHandler.httpMethod.valueOf().toString()](requestHandler.path, (instance[requestHandler.method] as Function).bind(instance)));
            }
        });

        // initiate server class decorated by @Server
        const Server = new (target as ObjectConstructor)(app);
    }
}

export default DecoratorsMetadata;
