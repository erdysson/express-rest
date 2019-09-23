import {Authenticated, POST, Provide} from '../decorators/decorators';
import { Request, Response } from 'express-serve-static-core';
import ConfigProvider from '../providers/Config.provider';

class ConfigController {

    constructor(
        @Provide('ConfigProvider') private ConfigProvider: ConfigProvider
    ) {

    }

    @Authenticated()
    @POST('/product')
    public getProductConfig(req: Request, res: Response): void {
        try {
            const branchCode: string = req.body.branchCode;
            this.ConfigProvider.getProductConfig(branchCode)
                .then((translation: Record<string, string>) => res.json(translation))
                .catch(() => res.sendStatus(500));

        } catch (e) {
            res.sendStatus(404);
        }
    }
}

export default ConfigController;
