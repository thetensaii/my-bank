import { Service } from "typedi";
import {UserEntity, UserJSON} from "../entities/user.entity"
import mysql from "promise-mysql"

export default class UserModel{

    constructor(private connection: Promise<mysql.PoolConnection>){}

    async findAll(): Promise<UserEntity[]>{
        
        let results:UserJSON[] = await this.connection.then( conn => {
            return conn.query("SELECT * FROM users;");
        })

        let users:UserEntity[] = results.map((result:UserJSON) => new UserEntity(result))
        return users;
    }

    async findByID(id:number): Promise<UserEntity|null> {
        let results:UserJSON[] = await this.connection.then( conn => {
            return conn.query("SELECT *\
                                FROM users \
                                WHERE id = ?;",
                            [id]);
        });
         
        if(!results.length){
            return null;
        }
        
        return new UserEntity(results[0]);
    }
    async findByLogin(login:string): Promise<UserEntity|null> {
        let results:UserJSON[] = await this.connection.then( conn => {
            return conn.query("SELECT *\
                                FROM users \
                                WHERE login = ?;",
                            [login]);
        });
                                             
        if(!results.length){
            return null;
        }
        
        return new UserEntity(results[0]);
    }

    async findByEmail(email:string): Promise<UserEntity|null> {
        let results:UserJSON[] = await this.connection.then( conn => {
            return conn.query("SELECT *\
                                FROM users \
                                WHERE email = ?;",
                            [email]);
        });
                                             
        if(!results.length){
            return null;
        }
        
        return new UserEntity(results[0]);
    }

    async add(user:UserEntity): Promise<number> {
        let result = await this.connection.then(conn => {
            return conn.query("INSERT INTO users\
                    (login, firstname, lastname, email, password, is_admin)\
                    VALUES (?, ?, ?, ?, ?, ?);",
                [user.login, user.firstname, user.lastname, user.email, user.password, user.is_admin]);
        });

        return result.insertId;
    } 

    async set(user:UserEntity): Promise<void>{
        await this.connection.then( conn => {
            return conn.query("UPDATE users\
                                SET login = ?,\
                                firstname = ?,\
                                lastname = ?,\
                                email = ?,\
                                is_admin = ?\
                                WHERE id = ?;",
                            [user.login, user.firstname, user.lastname, user.email, user.is_admin, user.id]);
        });
    }

    async setPassword(id:number, password:string){
        await this.connection.then( conn => {
            return conn.query("UPDATE users\
                                SET password = ?\
                                WHERE id = ?;",
                            [password, id]);
        });
    }

    async delete(id:number): Promise<void>{
        await this.connection.then(conn => {
            conn.query("DELETE from users\
                            WHERE id = ?;", 
                        [id]);
        });
    }
} 