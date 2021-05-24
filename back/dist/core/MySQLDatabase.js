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
const typedi_1 = require("typedi");
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const config_1 = __importDefault(require("../config"));
let MySQLDatabase = class MySQLDatabase {
    constructor() {
        this.pool = promise_mysql_1.default.createPool({
            host: config_1.default.DB.HOST,
            user: config_1.default.DB.USER,
            password: config_1.default.DB.PASSWORD,
            database: config_1.default.DB.NAME
        });
    }
    async getConnection() {
        return await this.pool.then(pool => {
            return pool.getConnection();
        });
    }
    async getPool() {
        return await this.pool;
    }
};
MySQLDatabase = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], MySQLDatabase);
exports.default = MySQLDatabase;
