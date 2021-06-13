import { Service } from "typedi";
import { Factory } from "../models/factory";
import { OperationEntity, OperationJSON } from "../entities/operation.entity";
import { UserPublicJSON, UserEntity } from "../entities/user.entity";
import { AccountEntity } from "../entities/account.entity";

@Service({transient : true})
export class OperationService {
    constructor(private factory:Factory){}

    async findAll():Promise<OperationEntity[]>{
        let operations:OperationEntity[] = await this.factory.OperationModel.findAll();
        await this.factory.release();
        
        return operations;
    }
    
    async findByID(id:number):Promise<OperationEntity|null>{
        let operationEntity:OperationEntity|null = await this.factory.OperationModel.findByID(id);
        await this.factory.release();

        return operationEntity;
    }

    async findByAccountID(accountID:number):Promise<OperationEntity[]>{
        let operations:OperationEntity[] = await this.factory.OperationModel.findByAccountID(accountID);
        await this.factory.release();

        return operations;
    }

    async create(user:UserPublicJSON, operation:OperationJSON):Promise<OperationEntity>{
        if(!user.id){ 
            this.factory.release();
            throw new Error("User doesn't exist");
        }
        
        let userEntity:UserEntity|null = await this.factory.UserModel.findByID(user.id);
        if(!userEntity){
            this.factory.release();
            throw new Error("User doesn't exist");
        }
        
        let accountEntity:AccountEntity|null = await this.factory.AccountModel.findByID(operation.account_id);
        if(!accountEntity){
            this.factory.release();
            throw new Error("Account doesn't exist");
        }
        
        if(accountEntity.user_id !== user.id){
            this.factory.release();
            throw new Error("You don't have access to this account");
        }

        let operationEntity:OperationEntity|null = new OperationEntity(operation);
        try {
            this.factory.beginTransaction();
            await this.factory.AccountModel.setBalance(operation.account_id, accountEntity.balance + operation.amount)
            let operationID:number = await this.factory.OperationModel.add(operationEntity);
            operationEntity = await this.factory.OperationModel.findByID(operationID);
            
            if(!operationEntity) throw new Error(); 

            this.factory.commit();
            await this.factory.release();

            return operationEntity;
        } catch (error) {
            await this.factory.rollback();
            await this.factory.release();

            throw new Error("Error while creating operation")
        }
    }

    async delete(user:UserPublicJSON, operationID:number):Promise<void>{
        if(!user.id){ 
            this.factory.release();
            throw new Error("User doesn't exist");
        }
        
        let userEntity:UserEntity|null = await this.factory.UserModel.findByID(user.id);
        if(!userEntity){
            this.factory.release();
            throw new Error("User doesn't exist");
        }
        let operationEntity:OperationEntity|null = await this.factory.OperationModel.findByID(operationID);
        
        if(!operationEntity){
            this.factory.release();
            throw new Error("Operation doesn't exist");
        }

        let accountEntity:AccountEntity|null = await this.factory.AccountModel.findByID(operationEntity.account_id);
        if(!accountEntity){
            this.factory.release();
            throw new Error("Account doesn't exist");
        }

        if(accountEntity.user_id !== user.id){
            this.factory.release();
            throw new Error("Youaccounts don't have access to this operation");
        }

        try {
            this.factory.beginTransaction();
            await this.factory.AccountModel.setBalance(operationEntity.account_id, accountEntity.balance - operationEntity.amount)
            await this.factory.OperationModel.delete(operationID);

            this.factory.commit();
            await this.factory.release();
        } catch (error) {
            await this.factory.rollback();
            await this.factory.release();

            throw new Error("Error while deleting operation")
        }
    }

}