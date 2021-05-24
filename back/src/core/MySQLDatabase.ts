import { Service } from "typedi";
import mysql from "promise-mysql";
import config from "../config"

@Service()
export default class MySQLDatabase {
    private pool: Promise<mysql.Pool>;

    constructor(){
        this.pool = mysql.createPool({
            host: config.DB.HOST,
            user: config.DB.USER,
            password: config.DB.PASSWORD,
            database: config.DB.NAME
        });
    }

    async getConnection(): Promise<mysql.PoolConnection>{
        return await this.pool.then(pool => {
            return pool.getConnection();
        });
    }

    async getPool():Promise<mysql.Pool>{
        return await this.pool;
    }
}
