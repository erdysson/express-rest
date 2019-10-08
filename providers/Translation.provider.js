"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const File_service_1 = __importDefault(require("../services/File.service"));
class TranslationProvider {
    constructor() {
        this.FileService = new File_service_1.default();
    }
    get(branchCode) {
        const filePath = path_1.default.join(process.cwd(), 'translations', `${branchCode}.json`);
        return this.FileService.readJson(filePath);
    }
}
exports.default = TranslationProvider;
