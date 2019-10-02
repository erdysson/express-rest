import FileService from '../services/File.service';
import path from 'path';
import jwt from 'jsonwebtoken';
import {IUserModel} from '../interfaces/models.interface';

class AuthProvider {

    private privateKey: jwt.Secret;
    private publicKey: string;

    private issuer: string = 'forma-web';
    private audience: string = 'http://formamueble.com';

    private FileService: FileService;

    constructor() {
        this.FileService = new FileService();
    }

    private getPrivateKey(): Promise<jwt.Secret> {
        if (this.privateKey) {
            return Promise.resolve(this.privateKey);
        }
        const filePath: string = path.join(__dirname, '..', 'security', 'private.key');
        return this.FileService.read(filePath)
            .then((privateKey: jwt.Secret) => {
                this.privateKey = privateKey;
                return this.privateKey;
            });
    }

    private getPublicKey(): Promise<string> {
        if (this.publicKey) {
            return Promise.resolve(this.publicKey);
        }
        const filePath: string = path.join(__dirname, '..', 'security', 'public.key');
        return this.FileService.read(filePath)
        .then((publicKey: string) => {
            this.publicKey = publicKey;
            return this.publicKey;
        });
    }

    public authenticate(user: IUserModel): Promise<string> {
        return this.getPrivateKey()
            .then((privateKey: jwt.Secret) => {
                const signOptions: jwt.SignOptions = {
                    // issuer: this.issuer,
                    // subject: user.email,
                    // audience: user.id.toString(),
                    expiresIn:  '12h'
                };
                const token = jwt.sign(user.toJSON(), privateKey, signOptions);
                console.log('generated token', token);
                return token;
            });
    }

    public authorize(token: string): Promise<void> {
        return this.getPublicKey()
            .then((publicKey: string) => {
                return new Promise((resolve, reject) => {
                    try {
                        const verifyOptions: jwt.VerifyOptions = {
                            // issuer: this.issuer,
                            // subject: email,
                            // audience: this.audience
                        };
                        const legit = jwt.verify(token, publicKey, verifyOptions);
                        console.log('JWT verification result: ', JSON.stringify(legit));
                        resolve();
                    } catch (e) {
                        console.log('can not verify the token', e);
                        reject(e);
                    }
                })
            });
    }
}

export default AuthProvider;
