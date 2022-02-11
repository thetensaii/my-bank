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
    
    async findByID(id:number):Promise<UserEntity|null>{
        let userEntity:UserEntity|null = await this.factory.UserModel.findByID(id);
        await this.factory.release();

        if(!userEntity){
            return null;
        }

        return userEntity;
    }

    async changeUser(user:UserPublicJSON, changedUser:UserPublicJSON): Promise<UserEntity>{
        if(!user.id){ 
            this.factory.release();
            throw new HttpError(StatusCodes.NOT_FOUND, "User doesn't exist");
        }
        
        if(!changedUser.id){
            this.factory.release();
            throw new HttpError(StatusCodes.NOT_FOUND, "Changed user doesn't exist");
        }
        
        if(!user.is_admin && user.id !== changedUser.id){
            this.factory.release();
            throw new HttpError(StatusCodes.FORBIDDEN, "You don't have access to this user.");
        }
        
        const otherUserWithSameLogin = await this.factory.UserModel.findByLogin(changedUser.login);
        if(otherUserWithSameLogin && otherUserWithSameLogin?.id !== user.id){
            this.factory.release();
            throw new HttpError(StatusCodes.CONFLICT, "Login already taken.");
        }

        const otherUserWithSameEmail = await this.factory.UserModel.findByEmail(changedUser.email);
        if(otherUserWithSameEmail && otherUserWithSameEmail?.id !== user.id){
            this.factory.release();
            console.log(otherUserWithSameEmail)
            throw new HttpError(StatusCodes.CONFLICT, "Email already taken.");
        }
        

        let userEntity:UserEntity|null = await this.factory.UserModel.findByID(user.id);
        if(!userEntity){
            this.factory.release();
            throw new HttpError(StatusCodes.NOT_FOUND, "User doesn't exist");
        } 

        let changedUserEntity:UserEntity|null = await this.factory.UserModel.findByID(changedUser.id);
        if(!changedUserEntity){
            this.factory.release();
            throw new HttpError(StatusCodes.NOT_FOUND, "Changed user doesn't exist");
        }

        changedUserEntity.login = changedUser.login;
        changedUserEntity.firstname = changedUser.firstname;
        changedUserEntity.lastname = changedUser.lastname;
        changedUserEntity.email = changedUser.email;
 
        try {
            this.factory.beginTransaction();
            await this.factory.UserModel.set(changedUserEntity);
            userEntity = await this.factory.UserModel.findByID(user.id);
            
            if(!userEntity) throw new Error(); 
            this.factory.commit();
            await this.factory.release();
            return userEntity;
        } catch (error) {
            await this.factory.rollback();
            await this.factory.release();
            console.log(error);

            throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, "Error while updating user")
        }
    }

    async changePassword(user:UserPublicJSON, user_id:number, password:string): Promise<UserEntity>{
        if(!user.id){ 
            this.factory.release();
            throw new HttpError(StatusCodes.NOT_FOUND, "User doesn't exist");
        }

        if(!user_id){ 
            this.factory.release();
            throw new HttpError(StatusCodes.NOT_FOUND, "Changed user doesn't exist");
        }

        if(!user.is_admin && user.id !== user_id){
            this.factory.release();
            throw new HttpError(StatusCodes.FORBIDDEN, "You don't have access to this user.");
        }

        let userEntity:UserEntity|null = await this.factory.UserModel.findByID(user.id);
        if(!userEntity){
            this.factory.release();
            throw new HttpError(StatusCodes.NOT_FOUND, "User doesn't exist");
        } 

        let changedUserEntity:UserEntity|null = await this.factory.UserModel.findByID(user_id);
        if(!changedUserEntity){
            this.factory.release();
            throw new HttpError(StatusCodes.NOT_FOUND, "Changed user doesn't exist");
        }

        let hashedPassword = await bcrypt.hash(password + config.PASSWORD_SALT, config.SALT_ROUNDS);

        try {
            this.factory.beginTransaction();
            
            await this.factory.UserModel.setPassword(user_id, hashedPassword);
            userEntity = await this.factory.UserModel.findByID(user.id);
            if(!userEntity) throw new Error(); 

            this.factory.commit();
            this.factory.release();

            return userEntity;
        } catch (error) {
            this.factory.rollback();
            this.factory.release();
            console.log(error);
            throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, "Error while updating user")
        }
    }

    async delete(user:UserPublicJSON, userID:number) {
        if(!user.id){ 
            this.factory.release();
            throw new HttpError(StatusCodes.NOT_FOUND, "User doesn't exist");
        }

        let userEntity:UserEntity|null = await this.factory.UserModel.findByID(userID);
        if(!userEntity){
            this.factory.release();
            throw new HttpError(StatusCodes.NOT_FOUND, "User doesn't exist");
        }

        if(user.id !== userID){
            this.factory.release();
            throw new HttpError(StatusCodes.FORBIDDEN, "Access denied to this account");
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
            throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, "Error while deleting user")
        }
    }

}