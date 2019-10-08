"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class FileService {
    read(absolutePath, encoding = FileService.DEFAULT_FILE_ENCODING) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(absolutePath, { encoding }, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    readJson(absolutePath, encoding = FileService.DEFAULT_FILE_ENCODING) {
        return this.read(absolutePath, encoding)
            .then((fileContent) => JSON.parse(fileContent));
    }
}
FileService.DEFAULT_FILE_ENCODING = 'utf8';
exports.default = FileService;
