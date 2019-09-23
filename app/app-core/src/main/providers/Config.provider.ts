import FileService from "../services/File.service";
import path from "path";

class ConfigProvider {

    private FileService: FileService;

    constructor() {
        this.FileService = new FileService();
    }

    public getProductConfig(branchCode: string): Promise<Record<string, string>> {
        const filePath: string = path.join(__dirname, '..', 'configuration', 'product', `${branchCode}.json`);
        return this.FileService.readJson(filePath);
    }
}

export default ConfigProvider;
