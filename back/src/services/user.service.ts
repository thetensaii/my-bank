import { Service } from "typedi";
import { UserEntity, UserPublicJSON } from "../entities/user.entity";
import { Factory } from "../models/factory";
import bcrypt from "bcrypt"
import config from "../config"
import { AccountEntity } from "../entities/account.entity";
import { HttpError } from "../core/HttpError";
import { StatusCodes } from "http-status-codes";

@Service({transient : true})
export class UserService {
    constructor(private factory:Factory){}

    async findAll():Promise<UserEntity[]>{
        let users:UserEntity[] = await this.factory.UserModel.findAll();
        await this.factory.release();
        
        return users;
    }
    
    async findByID(id:number):Promise<UserEntity>{
        let userEntity:UserEntity|null = await this.factory.UserModel.findByID(id);
        await this.factory.release();

        if(!userEntity){
            throw new HttpError(StatusCodes.NOT_FOUND, "User doesn't exist");
        }

        return userEntity;
    }

    async changeUser(user:UserPublicJSON): Promise<UserEntity>{
        if(!user.id){ 
            this.factory.release()
            throw new Error("User doesn't exist");
        }

        let userEntity:UserEntity|null = await this.factory.UserModel.findByID(user.id);
        if(!userEntity){
            this.factory.release()
            throw new Error("User doesn't exist");
        } 

        userEntity.login = user.login;
        userEntity.firstname = user.firstname;
        userEntity.lastname = user.lastname;
        userEntity.email = user.email;

        try {
            this.factory.beginTransaction();
            await this.factory.UserModel.set(userEntity);
            userEntity = await this.factory.UserModel.findByID(user.id);
            
            if(!userEntity) throw new Error(); 
            this.factory.commit();
            await this.factory.release()
            return userEntity;
        } catch (error) {
            await this.factory.rollback()
            await this.factory.release()

            throw new Error("Error while updating user")
        }
    }

    async changePassword(user:UserPublicJSON, password:string): Promise<UserEntity>{
        if(!user.id){ 
            this.factory.release();
            throw new Error("User doesn't exist");
        }
        let userEntity:UserEntity|null = await this.factory.UserModel.findByID(user.id);

        if(!userEntity){
            this.factory.release();
            throw new Error("User doesn't exist");
        } 

        userEntity.password = await bcrypt.hash(password + config.PASSWORD_SALT, config.SALT_ROUNDS);

        try {
            this.factory.beginTransaction();
            
            await this.factory.UserModel.setPassword(user.id, userEntity.password);
            userEntity = await this.factory.UserModel.findByID(user.id);
            if(!userEntity) throw new Error(); 

            this.factory.commit();
            this.factory.release();

            return userEntity;
        } catch (error) {
            this.factory.rollback();
            this.factory.release();
            console.log(error)
            throw new Error("Error while updating user")
        }
    }

    async delete(user:UserPublicJSON, userID:number): Promise<UserEntity>{
        if(!user.id){ 
            this.factory.release();
            throw new Error("User doesn't exist");
        }

        let userEntity:UserEntity|null = await this.factory.UserModel.findByID(userID);
        if(!userEntity){
            this.factory.release();
            throw new Error("User doesn't exist");
        }

        if(user.id !== userID){
            this.factory.release();
            throw new Error("Access denied to this account");
        }

        try {
            this.factory.beginTransaction();

            let accounts:AccountEntity[] = await this.factory.AccountModel.findByUserID(userID);
            for(let a of accounts){
                if(!a.id) continue;
                await this.factory.OperationModel.deleteByAccount(a.id);
            }
            await this.factory.AccountModel.deleteByUser(userID);
            await this.factory.UserModel.delete(userID);

            this.factory.commit();
            this.factory.release();

            return userEntity;
            
        } catch (error) {
            this.factory.rollback();
            this.factory.release();
            console.log(error)
            throw new Error("Error while deleting user")
        }
    }

}