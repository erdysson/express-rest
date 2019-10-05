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

    public getHomeConfig(branchCode: string): Promise<Record<string, any>> {
        const filePath: string = path.join(__dirname, '..', 'configuration', 'home', 'home.json');
        return this.FileService.readJson(filePath)
            .then((config: Record<string, any>) => config[branchCode]);
    }
}

export default ConfigProvider;
