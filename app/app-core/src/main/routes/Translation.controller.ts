import {GET, Provide} from '../../decorators/decorators';
import {Request, Response} from 'express-serve-static-core';
import TranslationProvider from '../providers/Translation.provider';

class TranslationController {

    constructor(
        @Provide('TranslationProvider') private TranslationProvider: TranslationProvider
    ) {
        //
    }

    @GET('/translation/:branchCode')
    public getTranslation(req: Request, res: Response): void {
        const branchCode: string = req.params.branchCode;
        if (!branchCode) {
            res.sendStatus(404);
        }
        this.TranslationProvider.get(branchCode)
            .then((translation: Record<string, string>) => res.json(translation))
            .catch(() => res.sendStatus(500));
    }
}

export default TranslationController;
