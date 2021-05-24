"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
const typedi_1 = require("typedi");
const User_1 = __importDefault(require("./User"));
const Account_1 = __importDefault(require("./Account"));
const Operation_1 = __importDefault(require("./Operation"));
const MySQLDatabase_1 = __importDefault(require("../core/MySQLDatabase"));
// @Service({ scope: "transient" })
let Factory = class Factory {
    constructor(database) {
        this.connection = database.getConnection();
        this.userModel = new User_1.default(this.connection);
        this.accountModel = new Account_1.default(this.connection);
        this.operationModel = new Operation_1.default(this.connection);
    }
    async beginTransaction() {
        await this.connection.then((connection) => {
            connection.beginTransaction();
        });
    }
    async commit() {
        await this.connection.then((connection) => {
            connection.commit();
        });
    }
    async rollback() {
        await this.connection.then((connection) => {
            connection.rollback();
        });
    }
    async release() {
        await this.connection.then((connection) => {
            connection.release();
        });
    }
    get UserModel() {
        return this.userModel;
    }
    get AccountModel() {
        return this.accountModel;
    }
    get OperationModel() {
        return this.operationModel;
    }
};
Factory = __decorate([
    typedi_1.Service({ transient: true }) // create a new instance everytime container.get is called
    ,
    __metadata("design:paramtypes", [MySQLDatabase_1.default])
], Factory);
exports.Factory = Factory;
