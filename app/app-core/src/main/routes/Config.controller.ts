import {POST, Provide} from '../../decorators/decorators';
import { Request, Response } from 'express-serve-static-core';
import ConfigProvider from '../../providers/Config.provider';

class ConfigController {

    constructor(
        @Provide('ConfigProvider') private ConfigProvider: ConfigProvider
    ) {
        //
    }

    @POST('/config/product')
    public getProductConfig(req: Request, res: Response): void {
        const branchCode: string = req.body.branchCode;
        if (!branchCode) {
            res.sendStatus(404);
        } else {
            this.ConfigProvider.getProductConfig(branchCode)
                .then((config: Record<string, any>) => res.json(config))
                .catch(() => res.sendStatus(500));
        }
    }

    @POST('/config/home')
    public getHomeConfig(req: Request, res: Response): void {
        const branchCode: string = req.body.branchCode;
        if (!branchCode) {
            res.sendStatus(404);
        } else {
            this.ConfigProvider.getHomeConfig(branchCode)
                .then((config: Record<string, any>) => res.json(config))
                .catch(() => res.sendStatus(500));
        }
    }
}

export default ConfigController;
