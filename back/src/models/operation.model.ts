import { Service } from "typedi";
import {OperationJSON, OperationEntity} from "../entities/operation.entity"
import mysql from "promise-mysql"

export default class AccountModel{

    constructor(private connection: Promise<mysql.PoolConnection>){}

    async findAll(): Promise<OperationEntity[]>{
        
        let results = await this.connection.then( conn => {
            return conn.query("SELECT * FROM operations;");
        });

        let accounts = results.map((result:OperationJSON) => new OperationEntity(result));
        return accounts;
    } 

    async findByAccountID(account_id:number): Promise<OperationEntity[]> {
        let results = await this.connection.then( conn => {
            return conn.query("SELECT *\
                                FROM operations \
                                WHERE account_id = ?;",
                            [account_id]);
        });

        let accounts = results.map((result:OperationJSON) => new OperationEntity(result));
        return accounts;
    }

    async findByID(id:number): Promise<OperationEntity|null> {
        let results = await this.connection.then( conn => {
            return conn.query("SELECT *\
                                FROM operations \
                                WHERE id = ?;",
                            [id]);
        });
                                             
        if(!results.length){
            return null;
        }
        
        return new OperationEntity(results[0]);
    }

    async add(operation:OperationEntity): Promise<number> {
        let result = await this.connection.then(conn => {
            return conn.query("INSERT INTO operations\
                    (account_id, amount, comment)\
                    VALUES (?, ?, ?);",
                [operation.account_id, operation.amount, operation.comment]);
        });
        return result.insertId;
    }

    // async set(operation:OperationEntity): Promise<void>{
    //     await this.connection.then( conn => {
    //         return conn.query("UPDATE operations\
    //                             SET account_id = ?,\
    //                             amount = ?\
    //                             WHERE id = ?;",
    //                         [operation.account_id, operation.amount, operation.id]);
    //     });
    // }

    async delete(id:number): Promise<void>{
        await this.connection.then(conn => {
            conn.query("DELETE from operations\
                            WHERE id = ?;", 
                        [id]);
        });
    }

}