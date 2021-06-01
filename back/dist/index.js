"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typedi_1 = __importDefault(require("typedi"));
const User_1 = require("./entities/User");
const fr_1 = __importDefault(require("faker/locale/fr"));
const Factory_1 = require("./models/Factory");
const app = express_1.default();
const main = async () => {
    let user = {
        login: fr_1.default.internet.userName(),
        firstname: fr_1.default.name.firstName(),
        lastname: fr_1.default.name.lastName(),
        email: fr_1.default.internet.email(),
        password: fr_1.default.internet.password()
    };
    console.log(user);
    console.log(" ");
    let userEntity = new User_1.UserEntity(user);
    // userEntity.is_admin = user.is_admin;
    console.log(userEntity.is_admin == false);
    console.log(" ");
    let factory = typedi_1.default.get(Factory_1.Factory);
    let userID = await factory.UserModel.add(userEntity);
    console.log(userID);
    console.log(" ");
    userEntity = await factory.UserModel.getByID(userID);
    console.log(userEntity);
};
main();
