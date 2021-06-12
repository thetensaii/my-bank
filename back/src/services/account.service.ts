import { Service } from "typedi";
import { Factory } from "../models/factory";
import bcrypt from "bcrypt"
import config from "../config"
import { AccountEntity, AccountJSON } from "../entities/account.entity";
import { UserEntity, UserPublicJSON } from "../entities/user.entity";

@Service({transient : true})
export class AccountService {
    constructor(private factory:Factory){}

    async findAll():Promise<AccountEntity[]>{
        let accounts:AccountEntity[] = await this.factory.AccountModel.findAll();
        await this.factory.release();
        
        return accounts;
    }
    
    async findByID(id:number):Promise<AccountEntity|null>{
        let accountEntity:AccountEntity|null = await this.factory.AccountModel.findByID(id);
        await this.factory.release();

        return accountEntity;
    }

    async findByUserID(id:number):Promise<AccountEntity[]>{
        let accounts:AccountEntity[] = await this.factory.AccountModel.findByUserID(id);
        await this.factory.release();

        return accounts;
    }

    async create(user:UserPublicJSON, account:AccountJSON): Promise<AccountEntity>{
        if(!user.id){ 
            this.factory.release();
            throw new Error("User doesn't exist");
        }
        
        let userEntity:UserEntity|null = await this.factory.UserModel.findByID(user.id);
        if(!userEntity){
            this.factory.release();
            throw new Error("User doesn't exist");
        }
        let accountEntity:AccountEntity|null = new AccountEntity(account);

        try {
            this.factory.beginTransaction();
            let accountID:number = await this.factory.AccountModel.add(accountEntity);
            accountEntity = await this.factory.AccountModel.findByID(accountID);
            
            if(!accountEntity) throw new Error(); 

            this.factory.commit();
            await this.factory.release()

            return accountEntity;
        } catch (error) {
            await this.factory.rollback()
            await this.factory.release()

            throw new Error("Error while creating account")
        }
    }

    async changeName(user:UserPublicJSON, accountID:number, name:string): Promise<AccountEntity>{
        if(!user.id){ 
            this.factory.release()
            throw new Error("User doesn't exist");
        }

        let accountEntity:AccountEntity|null = await this.factory.AccountModel.findByID(accountID);
        if(!accountEntity){
            this.factory.release()
            throw new Error("Account doesn't exist");
        }

        // Gestion des admins à faire 
        // Ex : if(!user.is_admin && accountEntity.user_id !== user.id)
        if(accountEntity.user_id !== user.id){
            this.factory.release()
            throw new Error("Access denied to this account");
        }

        accountEntity.name = name;

        try {
            this.factory.beginTransaction();
            await this.factory.AccountModel.setName(accountID, name);
            accountEntity = await this.factory.AccountModel.findByID(accountID);
            
            if(!accountEntity) throw new Error(); 
            this.factory.commit();
            await this.factory.release()
            return accountEntity;
        } catch (error) {
            await this.factory.rollback()
            await this.factory.release()

            throw new Error("Error while updating account")
        }
    }

    async delete(user:UserPublicJSON, accountID:number):Promise<void>{
        if(!user.id){ 
            this.factory.release()
            throw new Error("User doesn't exist");
        }

        let accountEntity:AccountEntity|null = await this.factory.AccountModel.findByID(accountID);
        if(!accountEntity){
            this.factory.release()
            throw new Error("Account doesn't exist");
        }

        if(accountEntity.user_id !== user.id){
            this.factory.release()
            throw new Error("Access denied to this account");
        }

        try {
            await this.factory.OperationModel.deleteByAccount(accountID);
            await this.factory.AccountModel.delete(accountID);
            
            await this.factory.release()
        } catch (error) {
            await this.factory.rollback()
            await this.factory.release()

            throw new Error("Error while deleting account")
        }

    }

}