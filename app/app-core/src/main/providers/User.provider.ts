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
                const userModel: IUserModel = new UserModel({
                    email: email,
                    name: name,
                    lastName: lastName,
                    password: AuthService.createPasswordHash(password),
                    created: Date.now(),
                    updated: Date.now()
                });
                return userModel.save({validateBeforeSave: true});
            });
    }

    public getUserByLoginData(email: string, password: string): Promise<IUserModel> {
        return new Promise<IUserModel>((resolve, reject) => {
            UserModel.findOne({email, password}, (error: any, user: IUserModel|null) => {
                if (error) {
                    reject(error);
                }
                resolve(user);
            });
        });
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
}

export default UserProvider;
