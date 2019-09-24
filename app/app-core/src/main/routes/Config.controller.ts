import {Authenticated, POST, Provide} from '../../../../../lib/decorators/decorators';
import { Request, Response } from 'express-serve-static-core';
import ConfigProvider from '../providers/Config.provider';

class ConfigController {

    constructor(
        @Provide('ConfigProvider') private ConfigProvider: ConfigProvider
    ) {

    }

    @Authenticated()
    @POST('/config/product')
    public getProductConfig(req: Request, res: Response): void {
        try {
            const branchCode: string = req.body.branchCode;
            this.ConfigProvider.getProductConfig(branchCode)
                .then((config: Record<string, any>) => res.json(config))
                .catch((e) => {
                    console.log(e);
                    res.sendStatus(500);
                });

        } catch (e) {
            res.sendStatus(404);
        }
    }

    @Authenticated()
    @POST('/config/home')
    public getHomeConfig(req: Request, res: Response): void {
        try {
            const branchCode: string = req.body.branchCode;
            this.ConfigProvider.getHomeConfig(branchCode)
                .then((config: Record<string, any>) => res.json(config))
                .catch((e) => {
                    console.log(e);
                    res.sendStatus(500);
                });

        } catch (e) {
            res.sendStatus(404);
        }
    }
}

export default ConfigController;
