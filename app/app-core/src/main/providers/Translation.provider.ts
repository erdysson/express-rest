import path from 'path';
import FileService from '../services/File.service';

class TranslationProvider {

    private FileService: FileService;

    constructor() {
        this.FileService = new FileService();
    }

    public get(branchCode: string): Promise<Record<string, string>> {
        const filePath: string = path.join(__dirname, '..', 'translations', `${branchCode}.json`);
        return this.FileService.readJson(filePath);
    }
}

export default TranslationProvider;
