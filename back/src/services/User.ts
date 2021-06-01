import { Service } from "typedi";
import { UserConfig, UserEntity } from "../entities/User";
import { Factory } from "../models/Factory";
import bcrypt from "bcrypt"
import config from "../config"


@Service()
export class UserService {
    constructor(private factory:Factory){}

    async signUp(user:UserConfig):Promise<UserEntity>{
        let userEntity:UserEntity|undefined;
        user.password = await bcrypt.hash(user.password + config.SALT, config.SALT_ROUNDS)
        userEntity = new UserEntity(user);

        let u = await this.factory.UserModel.getByLogin(user.login)
        if(u !== undefined){
            throw new Error("User already exists.")
        }
        
        try {
            await this.factory.beginTransaction();
            let userID:number = await this.factory.UserModel.add(userEntity);
            userEntity = await this.factory.UserModel.getByID(userID);

            await this.factory.commit();
            return userEntity!;
            
        }catch(error){
            await this.factory.rollback();
            throw new Error("Error while creating user")
        }

    }

    async login(login:string, password:string):Promise<UserEntity>{
        // this.factory.beginTransaction();

        let userEntity:UserEntity|undefined = await this.factory.UserModel.getByLogin(login);
        if(userEntity === undefined){
            throw new Error("User doesn't exist or wrong password");
        }

        let match = await bcrypt.compare(password + config.SALT, userEntity.password);
        if(match){
            // Retourner un token
            return userEntity;
        } else {
            throw new Error("User doesn't exist or wrong password");
        }
    }

    async changeUser(user:UserConfig){
        let userEntity:UserEntity|undefined = await this.factory.UserModel.getByID(user.id!);
        if(userEntity === undefined){
            throw new Error("User doesn't exist");
        }

        userEntity = new UserEntity(user);

        try {
            await this.factory.UserModel.set(userEntity);
        } catch (error) {
            throw new Error("Error while updating user")
        }
    }
}

