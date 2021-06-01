import "reflect-metadata"
import express from "express";
import Container from "typedi";
import UserModel from "./models/User";
import {UserEntity} from "./entities/User";
import {Entity} from "./entities/Entity"
import faker from "faker/locale/fr"
import config from "./config"
import MySQLDatabase from "./core/MySQLDatabase";
import { Factory } from "./models/Factory";

import bcrypt from "bcrypt"
const app = express();

const main = async () => {
    let user = {
        login: faker.internet.userName(),
        firstname : faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }

    console.log(user)
    console.log(" ");
    let userEntity:UserEntity|undefined = new UserEntity(user);
    
    // userEntity.is_admin = user.is_admin;

    console.log(userEntity.is_admin == false);
    console.log(" ");


    let factory = Container.get(Factory);
    
    let userID = await factory.UserModel.add(userEntity);
    console.log(userID);
    console.log(" ");

    userEntity = await factory.UserModel.getByID(userID);
    console.log(userEntity);
    let e = {
        id : 15
    }
}  

main();