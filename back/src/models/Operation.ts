import { Service } from "typedi";
import {OperatingConfig, OperationEntity} from "../entities/Operation"
import mysql from "promise-mysql"

export default class AccountModel{

    constructor(private connection: Promise<mysql.PoolConnection>){}

    async getAll(): Promise<OperationEntity[]>{
        
        let results = await this.connection.then( conn => {
            return conn.query("SELECT * FROM operations;");
        });

        let accounts = results.map((result:OperatingConfig) => new OperationEntity(result));
        return accounts;
    } 

    async getByAccountID(account_id:number): Promise<OperationEntity[]> {
        let results = await this.connection.then( conn => {
            return conn.query("SELECT *\
                                FROM operations \
                                WHERE account_id = ?;",
                            [account_id]);
        });

        let accounts = results.map((result:OperatingConfig) => new OperationEntity(result));
        return accounts;
    }

    async getByID(id:number): Promise<OperationEntity|undefined> {
        let results = await this.connection.then( conn => {
            return conn.query("SELECT *\
                                FROM operations \
                                WHERE id = ?;",
                            [id]);
        });
                                             
        if(!results.length){
            return undefined;
        }
        
        return new OperationEntity(results[0]);
    }

    async add(operation:OperationEntity): Promise<number> {
        let result = await this.connection.then(conn => {
            return conn.query("INSERT INTO operations\
                    (account_id, amount)\
                    VALUES (?, ?);",
                [operation.account_id, operation.amount]);
        });
        return result.insertId;
    }

    async set(operation:OperationEntity): Promise<boolean>{
        await this.connection.then( conn => {
            return conn.query("UPDATE operations\
                                SET account_id = ?,\
                                amount = ?\
                                WHERE id = ?;",
                            [operation.account_id, operation.amount, operation.id]);
        });

        return true;
    }

    async delete(id:number): Promise<boolean>{
        await this.connection.then(conn => {
            conn.query("DELETE from operations\
                            WHERE id = ?;", 
                        [id]);
        });

        return true;
    }

}