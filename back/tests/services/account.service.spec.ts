import 'reflect-metadata';
import { expect } from "chai";
import Container from "typedi";
import faker from "faker/locale/fr"

import MySQLDatabase from '../../src/core/mysql.database';
import mysql from "promise-mysql";

import { UserJSON, UserEntity, UserPublicJSON } from "../../src/entities/user.entity";
import { AccountEntity, AccountJSON } from '../../src/entities/account.entity';

import { AccountService } from "../../src/services/account.service"
import { AuthService } from "../../src/services/auth.service"
import { UserService } from '../../src/services/user.service';


describe("AccountService test", () => {
    let accountService:AccountService;
    let account:AccountJSON;
    let accounts:AccountJSON[] = [];
    let accountEntity:AccountEntity|null;


    let user:UserJSON;
    let userEntity:UserEntity;

    let authService:AuthService;

    before(async () => {
        let l_accounts:number = Math.ceil(Math.random() * 15); // Number of accounts
        
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

        for(let i = 0; i < l_accounts;++i){
            accounts.push({
                user_id : userEntity.id!,
                name : faker.vehicle.vehicle(),
                balance : faker.datatype.number()
            })
        }

    });

    after(async () => {    
        let db:MySQLDatabase = Container.get(MySQLDatabase);
        let conn:mysql.PoolConnection = await db.getConnection();

        await conn.query("DELETE FROM users");
        await conn.release();
    });

    beforeEach(async () => {    
        accountService = Container.get(AccountService);
    });

    afterEach(async () => {    
        let db:MySQLDatabase = Container.get(MySQLDatabase);
        let conn:mysql.PoolConnection = await db.getConnection();

        await conn.query("DELETE FROM accounts");
        await conn.release();
    });

    it("should find null", async () => {
        // ARRANGE

        // ACT
        accountEntity = await accountService.findByID(faker.datatype.number())

        // ASSERT
        expect(accountEntity).to.be.null;
    });

    it("should create Account", async () => {
        // ARRANGE
        let i:number = Math.floor(Math.random() * accounts.length);
        account = accounts[i];
        
        // ACT
        accountEntity = await accountService.create(userEntity.toPublicJSON(), account)

        // ASSERT
        expect(accountEntity).not.to.be.null
        expect(accountEntity?.id).to.be.a("number")
        expect(accountEntity?.name).to.be.equal(account.name);
        expect(accountEntity?.balance).to.be.equal(account.balance);
        expect(accountEntity?.created_at).to.be.a("Date");
        expect(accountEntity?.updated_at).to.be.null;
    });

    it("should find Account info", async () => {
        // ARRANGE
        let i:number = Math.floor(Math.random() * accounts.length);
        account = accounts[i];
        accountEntity = await accountService.create(userEntity.toPublicJSON(), account)
        
        let accountID:number = accountEntity.id!;

        // ACT
        accountService = Container.get(AccountService);
        accountEntity = await accountService.findByID(accountID)

        // ASSERT
        expect(accountEntity).not.to.be.null
        expect(accountEntity?.id).to.be.equal(accountID);
        expect(accountEntity?.name).to.be.equal(account.name);
        expect(accountEntity?.balance).to.be.equal(account.balance);
        expect(accountEntity?.created_at).to.be.a("Date");
        expect(accountEntity?.updated_at).to.be.null;
    });
  
    it("should change Account name", async () => {
        // ARRANGE
        let i:number = Math.floor(Math.random() * accounts.length);
        account = accounts[i];
        accountEntity = await accountService.create(userEntity.toPublicJSON(), account)
        
        // ACT
        accountService = Container.get(AccountService);
        let accountID = accountEntity.id!;
        let newName:string = faker.vehicle.vehicle();
        accountEntity = await accountService.changeName(userEntity.toPublicJSON(), accountID, newName);

        // ASSERT
        expect(accountEntity).not.to.be.null
        expect(accountEntity?.id).to.be.a("number")
        expect(accountEntity?.name).to.be.equal(newName);
        expect(accountEntity?.balance).to.be.equal(account.balance);
        expect(accountEntity?.created_at).to.be.a("Date");
        expect(accountEntity?.updated_at).to.be.a("Date");
    });

    it("should get all accounts", async () => {
        // ARRANGE
        for(let a of accounts){
            accountService = Container.get(AccountService);
            await accountService.create(userEntity.toPublicJSON(), a);
        }

        accountService = Container.get(AccountService);
        
        // ACT
        let results:AccountEntity[] = await accountService.findAll();

        // ASSERT
        expect(results.length).to.be.equal(accounts.length);
    });

    it("should get accounts by User", async () => {
        // ARRANGE
        for(let a of accounts){
            accountService = Container.get(AccountService);
            await accountService.create(userEntity.toPublicJSON(), a);
        }

        accountService = Container.get(AccountService);
        
        // ACT
        let results:AccountEntity[] = await accountService.findByUserID(userEntity.id!);

        // ASSERT
        expect(results.length).to.be.equal(accounts.length);
    });

    it("should delete Account", async () => {
        // ARRANGE
        let i:number = Math.floor(Math.random() * accounts.length);
        account = accounts[i];
        accountEntity = await accountService.create(userEntity.toPublicJSON(), account)
        
        let accountID:number = accountEntity.id!;

        // ACT
        accountService = Container.get(AccountService);
        await accountService.delete(userEntity.toPublicJSON(), accountID)

        // ASSERT
        accountService = Container.get(AccountService);
        accountEntity = await accountService.findByID(accountID);

        expect(accountEntity).to.be.null
    });

});
