"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Operation_1 = require("../entities/Operation");
class AccountModel {
    constructor(connection) {
        this.connection = connection;
    }
    async getAll() {
        let results = await this.connection.then(conn => {
            return conn.query("SELECT * FROM operations;");
        });
        let accounts = results.map((result) => new Operation_1.OperationEntity(result));
        return accounts;
    }
    async getByAccountID(account_id) {
        let results = await this.connection.then(conn => {
            return conn.query("SELECT *\
                                FROM operations \
                                WHERE account_id = ?;", [account_id]);
        });
        let accounts = results.map((result) => new Operation_1.OperationEntity(result));
        return accounts;
    }
    async getByID(id) {
        let results = await this.connection.then(conn => {
            return conn.query("SELECT *\
                                FROM operations \
                                WHERE id = ?;", [id]);
        });
        if (!results.length) {
            return undefined;
        }
        return new Operation_1.OperationEntity(results[0]);
    }
    async add(operation) {
        let result = await this.connection.then(conn => {
            return conn.query("INSERT INTO operations\
                    (account_id, amount)\
                    VALUES (?, ?);", [operation.account_id, operation.amount]);
        });
        return result.insertId;
    }
    async set(operation) {
        await this.connection.then(conn => {
            return conn.query("UPDATE operations\
                                SET account_id = ?,\
                                amount = ?\
                                WHERE id = ?;", [operation.account_id, operation.amount, operation.id]);
        });
        return true;
    }
    async delete(id) {
        await this.connection.then(conn => {
            conn.query("DELETE from operations\
                            WHERE id = ?;", [id]);
        });
        return true;
    }
}
exports.default = AccountModel;
