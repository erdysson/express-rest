import {Authenticated, GET, Provide} from '../../../../../lib/decorators/decorators';
import {Request, Response} from 'express-serve-static-core';
import TranslationProvider from '../providers/Translation.provider';

class TranslationController {

    constructor(
        @Provide('TranslationProvider') private TranslationProvider: TranslationProvider
    ) {

    }

    @Authenticated()
    @GET('/translation/:branchCode')
    public getTranslation(req: Request, res: Response): void {
        try {
            const branchCode: string = req.params.branchCode;
            this.TranslationProvider.get(branchCode)
                .then((translation: Record<string, string>) => res.json(translation))
                .catch(() => res.sendStatus(500));

        } catch (e) {
            res.sendStatus(404);
        }
    }
}

export default TranslationController;
