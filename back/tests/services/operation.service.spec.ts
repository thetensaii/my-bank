import 'reflect-metadata';
import { expect } from "chai";
import Container from "typedi";
import faker from "faker/locale/fr"

import MySQLDatabase from '../../src/core/mysql.database';
import mysql from "promise-mysql";

import { UserJSON, UserEntity, UserPublicJSON } from "../../src/entities/user.entity";
import { AccountEntity, AccountJSON } from '../../src/entities/account.entity';

import { OperationService } from "../../src/services/operation.service";
import { AccountService } from "../../src/services/account.service";
import { AuthService } from "../../src/services/auth.service";
import { UserService } from '../../src/services/user.service';
import { OperationEntity, OperationJSON } from '../../src/entities/operation.entity';


describe("AccountService test", () => {
    let operationService:OperationService;
    let operations:OperationJSON[] = [];
    let operationEntity:OperationEntity|null;

    let accountService:AccountService;
    let account:AccountJSON;
    let accountEntity:AccountEntity|null;


    let user:UserJSON;
    let userEntity:UserEntity;

    let authService:AuthService;

    before(async () => {
        let l_operations:number = Math.ceil(Math.random() * 15); // Number of operations
        
        // Creating user
        user = {
            login: faker.internet.userName(),
            firstname : faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            is_admin: Boolean(Math.round(Math.random()))
        };

        authService = Container.get(AuthService);
        userEntity = await authService.signUp(user);

        // Creating account
        account ={
            user_id : userEntity.id!,
            name : faker.vehicle.vehicle(),
            balance : faker.datatype.number()
        };
        
        accountService = Container.get(AccountService);
        accountEntity = await accountService.create(userEntity.toPublicJSON(), account);


        // Operations
        for(let i = 0; i < l_operations; ++i){
            operations.push({
                account_id : accountEntity.id!,
                amount : faker.datatype.number(),
                comment : faker.lorem.text()
            })
        }

    });

    after(async () => {
        let db:MySQLDatabase = Container.get(MySQLDatabase);
        let conn:mysql.PoolConnection = await db.getConnection();

        await conn.query("DELETE FROM accounts");
        await conn.query("DELETE FROM users");
        await conn.release();
    });

    beforeEach(async () => {    
        operationService = Container.get(OperationService);
    });
    
    afterEach(async () => {    
        let db:MySQLDatabase = Container.get(MySQLDatabase);
        let conn:mysql.PoolConnection = await db.getConnection();
        
        await conn.query("DELETE FROM operations");
        await conn.query("UPDATE accounts SET balance = ? WHERE id = ?", [account.balance, accountEntity!.id]);
        await conn.release();
    });

    it("should find nothing in DB", async () => {
        // ARRANGE
        let operationID = faker.datatype.number();

        // ACT
        operationEntity = await operationService.findByID(operationID);

        //ASSERT
        expect(operationEntity).to.be.null;
    });

    it("should add Operation to DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * operations.length);
        let operation = operations[i];

        // ACT
        operationEntity = await operationService.create(userEntity.toPublicJSON(), operation);

        accountService = Container.get(AccountService);
        accountEntity = await accountService.findByID(operation.account_id);

        // ASSERT
        expect(operationEntity).not.to.be.null;
        expect(operationEntity?.id).to.be.a("number");
        expect(operationEntity?.account_id).to.be.equal(operation.account_id);
        expect(operationEntity?.amount).to.be.equal(operation.amount);
        expect(operationEntity?.comment).to.be.equal(operation.comment);
        expect(operationEntity?.created_at).to.be.a("Date");
        expect(operationEntity?.updated_at).to.be.null;

        expect(accountEntity?.balance).to.be.equal(account.balance + operation.amount)
    });

    it("should find Operation by ID", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * operations.length);
        let operation = operations[i];
        operationEntity = await operationService.create(userEntity.toPublicJSON(), operation);

        // ACT
        operationService = Container.get(OperationService);
        let operationID:number = operationEntity.id!;
        operationEntity = await operationService.findByID(operationID);

        // ASSERT
        expect(operationEntity).not.to.be.null;
        expect(operationEntity?.id).to.be.equal(operationID);
        expect(operationEntity?.account_id).to.be.equal(operation.account_id);
        expect(operationEntity?.amount).to.be.equal(operation.amount);
        expect(operationEntity?.comment).to.be.equal(operation.comment);
        expect(operationEntity?.created_at).to.be.a("Date");
        expect(operationEntity?.updated_at).to.be.null;
    });

    it("should find Operation by Acount", async () => {
        // ARRANGE
        for(let o of operations){
            operationService = Container.get(OperationService); 
            operationEntity = await operationService.create(userEntity.toPublicJSON(), o);
        }

        // ACT
        operationService = Container.get(OperationService);
        let results = await operationService.findByAccountID(accountEntity?.id!);

        // ASSERT
        expect(results.length).to.be.equal(operations.length)
    });

    it("should find Operation by Acount", async () => {
        // ARRANGE
        for(let o of operations){
            operationService = Container.get(OperationService); 
            operationEntity = await operationService.create(userEntity.toPublicJSON(), o);
        }

        // ACT
        operationService = Container.get(OperationService);
        let results = await operationService.findAll();

        // ASSERT
        expect(results.length).to.be.equal(operations.length)
    });

    it("should delete Operation by ID", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * operations.length);
        let operation = operations[i];
        operationEntity = await operationService.create(userEntity.toPublicJSON(), operation);

        // ACT
        operationService = Container.get(OperationService);
        let operationID:number = operationEntity.id!;
        await operationService.delete(userEntity.toPublicJSON(), operationID);
        
        
        // ASSERT
        operationService = Container.get(OperationService);
        operationEntity = await operationService.findByID(operationID);

        accountService = Container.get(AccountService);
        accountEntity = await accountService.findByID(operation.account_id);


        expect(operationEntity).to.be.null;
        expect(accountEntity?.balance).to.be.equal(account.balance)
    });
    

});
