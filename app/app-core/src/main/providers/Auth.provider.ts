import FileService from '../services/File.service';
import path from 'path';
import jwt from 'jsonwebtoken';

class AuthProvider {

    private issuer: string = 'forma-web';
    private audience: string = 'http://formamueble.com';

    private FileService: FileService;

    constructor() {
        this.FileService = new FileService();
    }

    private getPrivateKey(): Promise<jwt.Secret> {
        const filePath: string = path.join(__dirname, '..', 'security', 'private.key');
        return this.FileService.read(filePath);
    }

    private getPublicKey(): Promise<string> {
        const filePath: string = path.join(__dirname, '..', 'security', 'public.key');
        return this.FileService.read(filePath);
    }

    public authenticate(user: any): Promise<string> {
        return this.getPrivateKey()
            .then((privateKey: jwt.Secret) => {
                const signOptions: jwt.SignOptions = {
                    issuer: this.issuer,
                    subject: user.email,
                    audience: user.id,
                    expiresIn:  '12h',
                    algorithm:  'RS256'
                };

                const token = jwt.sign(user, privateKey, signOptions);
                console.log('Token :', token);
                return token;
            });
    }

    public authorize(email: string, token: string): Promise<boolean> {
        return this.getPublicKey()
            .then((publicKey: string) => {
                try {
                    const verifyOptions: jwt.VerifyOptions = {
                        issuer: this.issuer,
                        subject: email,
                        audience: this.audience,
                        algorithms:  ['RS256']
                    };
                    const legit = jwt.verify(token, publicKey, verifyOptions);
                    console.log('JWT verification result: ', JSON.stringify(legit));
                    return true;
                } catch (e) {
                    return false;
                }
            });
    }
}

export default AuthProvider;
