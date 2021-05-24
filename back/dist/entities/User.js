"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    constructor(user) {
        this._id = user.id || null;
        this._login = user.login;
        this._firstname = user.firstname;
        this._lastname = user.lastname;
        this._email = user.email;
        this._password = user.password;
        this._created_at = user.created_at || null;
        this._updated_at = user.updated_at || null;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get login() {
        return this._login;
    }
    set login(value) {
        this._login = value;
    }
    get firstname() {
        return this._firstname;
    }
    set firstname(value) {
        this._firstname = value;
    }
    get lastname() {
        return this._lastname;
    }
    set lastname(value) {
        this._lastname = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    get created_at() {
        return this._created_at;
    }
    get updated_at() {
        return this._updated_at;
    }
}
exports.UserEntity = UserEntity;
