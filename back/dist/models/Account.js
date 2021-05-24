"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = require("../entities/Account");
class AccountModel {
    constructor(connection) {
        this.connection = connection;
    }
    async getAll() {
        let results = await this.connection.then(conn => {
            return conn.query("SELECT * FROM accounts;");
        });
        let accounts = results.map((result) => new Account_1.AccountEntity(result));
        return accounts;
    }
    async getByUserID(user_id) {
        let results = await this.connection.then(conn => {
            return conn.query("SELECT *\
                                FROM accounts \
                                WHERE user_id = ?;", [user_id]);
        });
        let accounts = results.map((result) => new Account_1.AccountEntity(result));
        return accounts;
    }
    async getByID(id) {
        let results = await this.connection.then(conn => {
            return conn.query("SELECT *\
                                FROM accounts \
                                WHERE id = ?;", [id]);
        });
        if (!results.length) {
            return undefined;
        }
        return new Account_1.AccountEntity(results[0]);
    }
    async add(account) {
        let result = await this.connection.then(conn => {
            return conn.query("INSERT INTO accounts\
                    (user_id, name, balance)\
                    VALUES (?, ?, ?);", [account.user_id, account.name, account.balance]);
        });
        return result.insertId;
    }
    async set(account) {
        await this.connection.then(conn => {
            return conn.query("UPDATE accounts\
                                SET user_id = ?,\
                                name = ?,\
                                balance = ?\
                                WHERE id = ?;", [account.user_id, account.name, account.balance, account.id]);
        });
        return true;
    }
    async delete(id) {
        await this.connection.then(conn => {
            conn.query("DELETE from accounts\
                            WHERE id = ?;", [id]);
        });
        return true;
    }
}
exports.default = AccountModel;
