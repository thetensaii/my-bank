import { Service } from "typedi";
import {AccountJSON, AccountEntity} from "../entities/account.entity"
import mysql from "promise-mysql"

export default class AccountModel{

    constructor(private connection: Promise<mysql.PoolConnection>){}

    async findAll(): Promise<AccountEntity[]>{
        
        let results = await this.connection.then( conn => {
            return conn.query("SELECT * FROM accounts;");
        })

        let accounts = results.map((result:AccountJSON) => new AccountEntity(result))
        return accounts;
    } 

    async findByUserID(user_id:number): Promise<AccountEntity[]> {
        let results = await this.connection.then( conn => {
            return conn.query("SELECT *\
                                FROM accounts \
                                WHERE user_id = ?;",
                            [user_id]);
        });

        let accounts = results.map((result:AccountJSON) => new AccountEntity(result))
        return accounts;
    }

    async findByID(id:number): Promise<AccountEntity|null> {
        let results = await this.connection.then( conn => {
            return conn.query("SELECT *\
                                FROM accounts \
                                WHERE id = ?;",
                            [id]);
        });
                                             
        if(!results.length){
            return null;
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

    async set(account:AccountEntity): Promise<void>{
        await this.connection.then( conn => {
            return conn.query("UPDATE accounts\
                                SET user_id = ?,\
                                name = ?,\
                                balance = ?\
                                WHERE id = ?;",
                            [account.user_id, account.name, account.balance, account.id]);
        });
    }

    async setName(accountID:number, name:string): Promise<void>{
        await this.connection.then( conn => {
            return conn.query("UPDATE accounts\
                                SET name = ?\
                                WHERE id = ?;",
                            [name, accountID]);
        });
    }

    async setBalance(accountID:number, balance:number): Promise<void>{
        await this.connection.then( conn => {
            return conn.query("UPDATE accounts\
                                SET balance = ?\
                                WHERE id = ?;",
                            [balance, accountID]);
        });
    }

    async delete(id:number): Promise<void>{
        await this.connection.then(conn => {
            conn.query("DELETE from accounts\
                            WHERE id = ?;", 
                        [id]);
        });
    }

    async deleteByUser(userID:number): Promise<void>{
        await this.connection.then(conn => {
            conn.query("DELETE from accounts\
                            WHERE user_id = ?;", 
                        [userID]);
        });
    }

} 