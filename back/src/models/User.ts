import { Service } from "typedi";
import {UserEntity, UserConfig} from "../entities/User"
import mysql from "promise-mysql"

export default class UserModel{

    constructor(private connection: Promise<mysql.PoolConnection>){}

    async getAll(): Promise<UserEntity[]>{
        
        let results = await this.connection.then( conn => {
            return conn.query("SELECT * FROM users;");
        })

        let users = results.map((result:UserConfig) => new UserEntity(result))
        return users;
    } 

    async getByID(id:number): Promise<UserEntity|undefined> {
        let results = await this.connection.then( conn => {
            return conn.query("SELECT *\
                                FROM users \
                                WHERE id = ?;",
                            [id]);
        });
                                             
        if(!results.length){
            return undefined;
        }
        
        return new UserEntity(results[0]);
    }
    async getByLogin(login:string): Promise<UserEntity|undefined> {
        let results = await this.connection.then( conn => {
            return conn.query("SELECT *\
                                FROM users \
                                WHERE login = ?;",
                            [login]);
        });
                                             
        if(!results.length){
            return undefined;
        }
        
        return new UserEntity(results[0]);
    }

    async add(user:UserEntity): Promise<number> {
        let result = await this.connection.then(conn => {
            return conn.query("INSERT INTO users\
                    (login, firstname, lastname, email, password)\
                    VALUES (?, ?, ?, ?, ?);",
                [user.login, user.firstname, user.lastname, user.email, user.password]);
        });

        return result.insertId;
    }

    async set(user:UserEntity): Promise<boolean>{
        await this.connection.then( conn => {
            return conn.query("UPDATE users\
                                SET login = ?,\
                                firstname = ?,\
                                lastname = ?,\
                                email = ?,\
                                password = ?\
                                WHERE id = ?;",
                            [user.login, user.firstname, user.lastname, user.email, user.password, user.id]);
        });

        return true;
    }

    async delete(id:number): Promise<boolean>{
        await this.connection.then(conn => {
            conn.query("DELETE from users\
                            WHERE id = ?;", 
                        [id]);
        });
        return true;
    }

} 