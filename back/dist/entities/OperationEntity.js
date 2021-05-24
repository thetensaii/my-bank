"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationEntity = void 0;
class OperationEntity {
    constructor(operation) {
        this._id = operation.id || null;
        this._account_id = operation.account_id;
        this._amount = operation.amount;
        this._created_at = operation.created_at || null;
        this._updated_at = operation.updated_at || null;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get account_id() {
        return this._account_id;
    }
    set account_id(value) {
        this._account_id = value;
    }
    get amount() {
        return this._amount;
    }
    set amount(value) {
        this._amount = value;
    }
    get created_at() {
        return this._created_at;
    }
    get updated_at() {
        return this._updated_at;
    }
}
exports.OperationEntity = OperationEntity;
