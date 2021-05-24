"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app = express_1.default();
const main = async () => {
    let salt = "gato";
    let password = "password";
    // let hash = await bcrypt.hash(password, 10);
    // let match1 = await bcrypt.compare(password, hash); 
    let match2 = await bcrypt_1.default.compare("password", "$2b$10$sJEFRi89dvhDnqtmGU5ffOWNzV1dwSwxGxR4jJUqb/jnEfTVg9mpm");
    // console.log(hash);
    console.log(match2);
};
main();
