import { Service } from "typedi";
import { Factory } from "../models/factory";
import bcrypt from "bcrypt"
import config from "../config"
import { AccountEntity } from "../entities/account.entity";
import { UserPublicJSON } from "../entities/user.entity";

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

}