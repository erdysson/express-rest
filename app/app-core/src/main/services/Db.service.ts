import {Connection, Mongoose, connect} from 'mongoose';export default class DbService {    private static MONGO_URI: string = 'mongodb://10.0.62.74:31519/test';    public static connect(): Promise<Connection> {        return connect(DbService.MONGO_URI, {keepAlive: true, keepAliveInitialDelay: 300000})            .then((m: Mongoose) => {                m.connection.useDb('test');                return m.connection;            })            .catch((e) => {                console.log('exception', e);                return null;            });    }}