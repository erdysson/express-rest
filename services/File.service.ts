import fs, {PathLike} from 'fs';

class FileService {

    private static DEFAULT_FILE_ENCODING: string = 'utf8';

    public read(absolutePath: PathLike, encoding: string = FileService.DEFAULT_FILE_ENCODING): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(absolutePath, {encoding}, (error: NodeJS.ErrnoException, data: string) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        })
    }

    public readJson(absolutePath: PathLike, encoding: string = FileService.DEFAULT_FILE_ENCODING): Promise<Record<string, string>> {
        return this.read(absolutePath, encoding)
            .then((fileContent: string) => JSON.parse(fileContent));
    }
}

export default FileService;
