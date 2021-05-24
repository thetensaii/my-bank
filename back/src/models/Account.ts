import { Service } from "typedi";
import {AccountConfig, AccountEntity} from "../entities/Account"
import mysql from "promise-mysql"

export default class AccountModel{

    constructor(private connection: Promise<mysql.PoolConnection>){}

    async getAll(): Promise<AccountEntity[]>{
        
        let results = await this.connection.then( conn => {
            return conn.query("SELECT * FROM accounts;");
        })

        let accounts = results.map((result:AccountConfig) => new AccountEntity(result))
        return accounts;
    } 

    async getByUserID(user_id:number): Promise<AccountEntity[]> {
        let results = await this.connection.then( conn => {
            return conn.query("SELECT *\
                                FROM accounts \
                                WHERE user_id = ?;",
                            [user_id]);
        });

        let accounts = results.map((result:AccountConfig) => new AccountEntity(result))
        return accounts;
    }

    async getByID(id:number): Promise<AccountEntity|undefined> {
        let results = await this.connection.then( conn => {
            return conn.query("SELECT *\
                                FROM accounts \
                                WHERE id = ?;",
                            [id]);
        });
                                             
        if(!results.length){
            return undefined;
        }
        
        return new AccountEntity(results[0]);
    }

    async add(account:AccountEntity): Promise<number> {
        let result = await this.connection.then(conn => {
            return conn.query("INSERT INTO accounts\
                    (user_id, name, balance)\
                    VALUES (?, ?, ?);",
                [account.user_id, account.name, account.balance]);
        });

        return result.insertId;
    }

    async set(account:AccountEntity): Promise<boolean>{
        await this.connection.then( conn => {
            return conn.query("UPDATE accounts\
                                SET user_id = ?,\
                                name = ?,\
                                balance = ?\
                                WHERE id = ?;",
                            [account.user_id, account.name, account.balance, account.id]);
        });

        return true;
    }

    async delete(id:number): Promise<boolean>{
        await this.connection.then(conn => {
            conn.query("DELETE from accounts\
                            WHERE id = ?;", 
                        [id]);
        });
        return true;
    }

} 