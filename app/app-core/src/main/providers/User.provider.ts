import {IUserModel} from '../interfaces/models.interface';
import UserModel from '../models/user.model';
import DbService from '../services/Db.service';
import {Connection} from 'mongoose';
import AuthService from '../services/Auth.service';

class UserProvider {

    constructor() {
        //
    }

    public createUser(email: string, password: string, name: string, lastName: string): Promise<IUserModel> {
        return DbService.connect()
            .then((connection: Connection) => {
                console.log('connected to db');
                return AuthService.createPasswordHash(password)
                    .then((passwordHash: string) => {
                        const userModel: IUserModel = new UserModel({
                            email: email,
                            name: name,
                            lastName: lastName,
                            password: passwordHash,
                            created: Date.now(),
                            updated: Date.now()
                        });

                        return new Promise<IUserModel>((resolve, reject) => {
                            userModel.save({validateBeforeSave: true}, (err: any, product: IUserModel) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(product);
                                }
                            });
                        });
                    });
            });
    }

    public getUserByEmail(email: string): Promise<IUserModel> {
        return DbService.connect()
            .then((connection: Connection) => {
                return new Promise<IUserModel>((resolve, reject) => {
                    UserModel.findOne({email}, (error: any, user: IUserModel|null) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(user);
                        }
                    });
                });
            })
            .catch((e: any) => {
                console.log('can not connect to db', e);
                return Promise.reject(e);
            })
    }

    public getUserById(id: string): Promise<IUserModel> {
        return new Promise<IUserModel>((resolve, reject) => {
            UserModel.findById(id, (error: any, user: IUserModel|null) => {
                if (error) {
                    reject(error);
                }
                resolve(user);
            });
        });
    }

    public getUsers(): Promise<IUserModel[]> {
        return new Promise((resolve, reject) => {
            DbService.connect()
            .then((connection: Connection) => {
                UserModel.find({}, (err: any, res: IUserModel[]) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
                .catch((e: any) => reject(e));
            });
        });
    }
}

export default UserProvider;
