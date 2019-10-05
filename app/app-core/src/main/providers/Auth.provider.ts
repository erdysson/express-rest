import FileService from '../services/File.service';
import path from 'path';
import jwt, {Secret, SignOptions} from 'jsonwebtoken';
import {IUserModel} from '../interfaces/models.interface';

class AuthProvider {

    private privateKey: jwt.Secret;

    private FileService: FileService;

    constructor() {
        this.FileService = new FileService();
    }

    private getPrivateKey(): Promise<jwt.Secret> {
        if (this.privateKey) {
            return Promise.resolve(this.privateKey);
        }
        const filePath: string = path.join(__dirname, '../../security', 'private.key');
        return this.FileService.read(filePath)
            .then((privateKey: jwt.Secret) => {
                this.privateKey = privateKey;
                return this.privateKey;
            });
    }

    public login(user: IUserModel): Promise<string> {
        return this.getPrivateKey()
            .then((privateKey: Secret) => {
                const signOptions: SignOptions = {
                    algorithm: 'RS256',
                    expiresIn:  '12h'
                };
                const {name, lastName, email, id} = user;
                const token = jwt.sign({
                    name,
                    lastName,
                    email,
                    id
                }, privateKey, signOptions);
                return token;
            });
    }
}

export default AuthProvider;
