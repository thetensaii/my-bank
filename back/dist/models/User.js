"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
class UserModel {
    constructor(connection) {
        this.connection = connection;
    }
    async getAll() {
        let results = await this.connection.then(conn => {
            return conn.query("SELECT * FROM users;");
        });
        let users = results.map((result) => new User_1.UserEntity(result));
        return users;
    }
    async getByID(id) {
        let results = await this.connection.then(conn => {
            return conn.query("SELECT *\
                                FROM users \
                                WHERE id = ?;", [id]);
        });
        if (!results.length) {
            return undefined;
        }
        return new User_1.UserEntity(results[0]);
    }
    async getByLogin(login) {
        let results = await this.connection.then(conn => {
            return conn.query("SELECT *\
                                FROM users \
                                WHERE login = ?;", [login]);
        });
        if (!results.length) {
            return undefined;
        }
        return new User_1.UserEntity(results[0]);
    }
    async add(user) {
        let result = await this.connection.then(conn => {
            return conn.query("INSERT INTO users\
                    (login, firstname, lastname, email, password)\
                    VALUES (?, ?, ?, ?, ?);", [user.login, user.firstname, user.lastname, user.email, user.password]);
        });
        return result.insertId;
    }
    async set(user) {
        await this.connection.then(conn => {
            return conn.query("UPDATE users\
                                SET login = ?,\
                                firstname = ?,\
                                lastname = ?,\
                                email = ?,\
                                password = ?\
                                WHERE id = ?;", [user.login, user.firstname, user.lastname, user.email, user.password, user.id]);
        });
        return true;
    }
    async delete(id) {
        await this.connection.then(conn => {
            conn.query("DELETE from users\
                            WHERE id = ?;", [id]);
        });
        return true;
    }
}
exports.default = UserModel;
