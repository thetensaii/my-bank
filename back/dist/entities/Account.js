"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountEntity = void 0;
class AccountEntity {
    constructor(account) {
        this._id = account.id || null;
        this._user_id = account.user_id;
        this._name = account.name;
        this._balance = account.balance;
        this._created_at = account.created_at || null;
        this._updated_at = account.updated_at || null;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get user_id() {
        return this._user_id;
    }
    set user_id(value) {
        this._user_id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get balance() {
        return this._balance;
    }
    set balance(value) {
        this._balance = value;
    }
    get created_at() {
        return this._created_at;
    }
    get updated_at() {
        return this._updated_at;
    }
}
exports.AccountEntity = AccountEntity;
