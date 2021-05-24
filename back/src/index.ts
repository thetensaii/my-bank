import "reflect-metadata"
import express from "express";
import Container from "typedi";
import UserModel from "./models/User";
import {UserEntity} from "./entities/User";
import faker from "faker/locale/fr"
import config from "./config"
import MySQLDatabase from "./core/MySQLDatabase";
import { Factory } from "./models/Factory";

import bcrypt from "bcrypt"
const app = express();

const main = async () => {
    let salt = "gato";
    let password = "password";

    // let hash = await bcrypt.hash(password, 10);


    // let match1 = await bcrypt.compare(password, hash); 
    let match2 = await bcrypt.compare("password", "$2b$10$sJEFRi89dvhDnqtmGU5ffOWNzV1dwSwxGxR4jJUqb/jnEfTVg9mpm");

    // console.log(hash);
    console.log(match2);

}  

main();