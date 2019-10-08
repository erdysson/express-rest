"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const File_service_1 = __importDefault(require("../services/File.service"));
const path_1 = __importDefault(require("path"));
class ConfigProvider {
    constructor() {
        this.FileService = new File_service_1.default();
    }
    getProductConfig(branchCode) {
        const filePath = path_1.default.join(process.cwd(), 'configuration', 'product', `${branchCode}.json`);
        return this.FileService.readJson(filePath);
    }
}
exports.default = ConfigProvider;
