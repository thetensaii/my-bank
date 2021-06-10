import { Service } from "typedi";
import UserModel from "./user.model";
import AccountModel from "./account.model";
import OperationModel from "./operation.model";
import mysql from "promise-mysql"
import MySQLDatabase from "../core/mysql.database";


@Service({transient : true}) // create a new instance everytime container.get is called
export class Factory {
    private userModel: UserModel;
    private accountModel:AccountModel;
    private operationModel:OperationModel;
    private connection: Promise<mysql.PoolConnection>;
    
    constructor(database:MySQLDatabase){
        this.connection = database.getConnection();
        this.userModel = new UserModel(this.connection);
        this.accountModel = new AccountModel(this.connection);
        this.operationModel = new OperationModel(this.connection);
    }

    async beginTransaction(){
        await this.connection.then((connection) => {
            connection.beginTransaction();
        });
    }

    async commit(){
        await this.connection.then((connection) => {
            connection.commit();
        });
    }
    async rollback(){
        await this.connection.then((connection) => {
            connection.rollback();
        });
    }

    async release(){
        await this.connection.then((connection) => {
            connection.release();
        });
    }

    get UserModel(): UserModel{
        return this.userModel;
    }
    get AccountModel(): AccountModel{
        return this.accountModel;
    }

    get OperationModel(): OperationModel{
        return this.operationModel;
    }
}