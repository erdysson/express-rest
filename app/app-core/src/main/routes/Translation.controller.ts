import {GET, Provide} from '../../decorators/decorators';
import {Request, Response} from 'express-serve-static-core';
import TranslationProvider from '../../providers/Translation.provider';
import {StatusCode} from '../../enums/StatusCode.enum';

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
            res.sendStatus(StatusCode.BAD_REQUEST);
        }
        this.TranslationProvider.get(branchCode)
            .then((translation: Record<string, string>) => res.json(translation))
            .catch(() => res.sendStatus(StatusCode.NOT_FOUND));
    }
}

export default TranslationController;
