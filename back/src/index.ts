import "reflect-metadata"
import express from "express";
import Container from "typedi";
import { UserEntity, UserJSON, UserPublicJSON } from "./entities/user.entity";
import faker from "faker/locale/fr"
import { createUserToken, verifyUserToken } from "./core/JWT"
import { ObjectToken } from "./types/ObjectToken";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { Factory } from "./models/factory"

const app = express();

const main = async () => {
    let users:UserJSON[] = [];
     
    for(let i = 0; i < 5;++i){ 
        users.push({
            login: faker.internet.userName(),
            firstname : faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            is_admin: Boolean(Math.round(Math.random()))
        });
    }

    console.log(users.length)
    let authService:AuthService;
    // let userEntity = await Promise.all(users.map(async (u) =>{
    //     authService = Container.get(AuthService);
    //     return await authService.signUp(u);
    // }));

    for(let u of users){
        authService = Container.get(AuthService);
        await authService.signUp(u);
    }


    // let factory = Container.get(Factory); 
    // let usersEntity = users.map(user => new UserEntity(user));
    // await usersEntity.map(async u => await factory.UserModel.add(u));
    // await factory.release()
    // console.log(usersEntity.length);
    
    let userService:UserService = Container.get(UserService); 
        // ACT 
    let results:UserEntity[] = await userService.findAll();
 
    console.log(results.length);
 
}

main(); 