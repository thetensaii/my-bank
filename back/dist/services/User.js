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
exports.UserService = void 0;
const typedi_1 = require("typedi");
const User_1 = require("../entities/User");
const Factory_1 = require("../models/Factory");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
let UserService = class UserService {
    constructor(factory) {
        this.factory = factory;
    }
    async signUp(user) {
        let userEntity;
        user.password = await bcrypt_1.default.hash(user.password + config_1.default.SALT, config_1.default.SALT_ROUNDS);
        userEntity = new User_1.UserEntity(user);
        let u = await this.factory.UserModel.getByLogin(user.login);
        if (u !== undefined) {
            throw new Error("User already exists.");
        }
        try {
            await this.factory.beginTransaction();
            let userID = await this.factory.UserModel.add(userEntity);
            userEntity = await this.factory.UserModel.getByID(userID);
            await this.factory.commit();
            return userEntity;
        }
        catch (error) {
            await this.factory.rollback();
            throw new Error("Error while creating user");
        }
    }
    async login(login, password) {
        // this.factory.beginTransaction();
        let userEntity = await this.factory.UserModel.getByLogin(login);
        if (userEntity === undefined) {
            throw new Error("User doesn't exist or wrong password");
        }
        let match = await bcrypt_1.default.compare(password + config_1.default.SALT, userEntity.password);
        if (match) {
            // Retourner un token
            return userEntity;
        }
        else {
            throw new Error("User doesn't exist or wrong password");
        }
    }
    async changeUser(user) {
        let userEntity = await this.factory.UserModel.getByID(user.id);
        if (userEntity === undefined) {
            throw new Error("User doesn't exist or wrong password");
        }
    }
};
UserService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [Factory_1.Factory])
], UserService);
exports.UserService = UserService;
