import bcrypt from 'bcrypt';export default class AuthService {    private static SALT_ROUNDS: number = 10;    public static createPasswordHash(password: string): Promise<string> {        return new Promise<string>((resolve, reject) => {            bcrypt.hash(password, AuthService.SALT_ROUNDS, (error: Error, encrypted: string) => {                if (error) {                    reject(error);                }                resolve(encrypted);            })        });    }    public static validatePassword(password: string, passwordHash: string): Promise<boolean> {        return new Promise<boolean>((resolve, reject) => {            bcrypt.compare(password, passwordHash, (error: Error, same: boolean) => {                if (error) {                    reject(error);                }                resolve(same);            });        });    }}