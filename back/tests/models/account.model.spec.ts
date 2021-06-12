import 'reflect-metadata';
import { expect } from "chai";
import Container from "typedi";
import {UserJSON, UserEntity} from "../../src/entities/user.entity";
import {AccountJSON, AccountEntity} from "../../src/entities/account.entity";
import { Factory } from "../../src/models/factory"
import faker from "faker/locale/fr"

describe("AccountModel test", () => {
    let user:UserJSON;
    let userEntity:UserEntity|null;
    let userID:number;

    let accounts:AccountJSON[] = [];
    let accountEntity:AccountEntity|null;

    let factory:Factory;

    before(async () => {
        let l = Math.ceil(Math.random() * 15); // number of accounts

        // SETTING UP A USER
        user = {
            login: faker.internet.userName(),
            firstname : faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };
        userEntity = new UserEntity(user);

        factory = Container.get(Factory); 
        userID = await factory.UserModel.add(userEntity);

        for(let i = 0; i < l; ++i){
            accounts.push({
                user_id : userID,
                name : faker.vehicle.vehicle(),
                balance : faker.datatype.number()
            })
        }
    })

    beforeEach(async () => {
        await factory.beginTransaction();
    });
    
    afterEach(async () => {
        await factory.rollback();
    });

    after(async () => {
        await factory.UserModel.delete(userID);
        await factory.release();
    })

    it("should find nothing in DB", async () => {
        // ARRANGE
        let accountID = Math.ceil(Math.random() * 15);

        // ACT
        accountEntity = await factory.AccountModel.findByID(accountID);

        //ASSERT
        expect(accountEntity).to.be.null;
    });

    it("should add Account to DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * accounts.length);
        let account = accounts[i];
        accountEntity = new AccountEntity(account);

        // ACT
        let accountID:number = await factory.AccountModel.add(accountEntity!);

        // ASSERT
        expect(accountID).to.be.a("number");
    })

    it("should find Account by ID in DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * accounts.length);
        let account = accounts[i];
        accountEntity = new AccountEntity(account);

        let accountID:number = await factory.AccountModel.add(accountEntity!);

        // ACT
        accountEntity = await factory.AccountModel.findByID(accountID);

        //ASSERT
        expect(accountEntity).not.to.be.null;
        expect(accountEntity!.id).to.be.equal(accountID);
        expect(accountEntity!.user_id).to.be.equal(account.user_id);
        expect(accountEntity!.name).to.be.equal(account.name);
        expect(accountEntity!.balance).to.be.equal(account.balance);
        expect(accountEntity!.created_at).to.be.a("Date");
        expect(accountEntity!.updated_at).to.be.null;
    });

    it("should find Accounts by UserID in DB", async () => {
        // ARRANGE
        let user2 = {
            login: faker.internet.userName(),
            firstname : faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };
        let userEntity2:UserEntity|null = new UserEntity(user2);
        let userID2:number = await factory.UserModel.add(userEntity2);

        for(let i = 0; i < 3; ++i){
            let account = {
                user_id : userID2,
                name : faker.vehicle.vehicle(),
                balance : faker.datatype.number()
            }
            accountEntity = new AccountEntity(account);
            await factory.AccountModel.add(accountEntity);
        }

        let accountsEntity:AccountEntity[] = accounts.map(account => new AccountEntity(account));
        accountsEntity.map(async a => await factory.AccountModel.add(a));

        // ACT
        let user1Accounts = await factory.AccountModel.findByUserID(userID);

        // ASSERT
        expect(user1Accounts.length).to.be.equal(accounts.length)
    })

    it("should set Account in DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * accounts.length);
        let account = accounts[i];
        accountEntity = new AccountEntity(account);

        let accountID:number = await factory.AccountModel.add(accountEntity);
        accountEntity = await factory.AccountModel.findByID(accountID);
        
        // ACT
        let setAccount = {
            name : faker.vehicle.vehicle(),
            balance : faker.datatype.number()
        }
        accountEntity!.name = setAccount.name;
        accountEntity!.balance = setAccount.balance;
        
        await factory.AccountModel.set(accountEntity!);
        accountEntity = await factory.AccountModel.findByID(accountID);

        // ASSERT
        expect(accountEntity).not.to.be.null;
        expect(accountEntity!.id).to.be.equal(accountID);
        expect(accountEntity!.user_id).to.be.equal(account.user_id);
        expect(accountEntity!.name).to.be.equal(setAccount.name);
        expect(accountEntity!.balance).to.be.equal(setAccount.balance);
        expect(accountEntity!.created_at).to.be.a("Date");
        expect(accountEntity!.updated_at).to.be.a("Date");
    });

    it("should set Account name in DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * accounts.length);
        let account = accounts[i];
        accountEntity = new AccountEntity(account);

        let accountID:number = await factory.AccountModel.add(accountEntity);
        accountEntity = await factory.AccountModel.findByID(accountID);
        
        // ACT
        let newName : string = faker.vehicle.vehicle();
        
        await factory.AccountModel.setName(accountID, newName);
        accountEntity = await factory.AccountModel.findByID(accountID);

        // ASSERT
        expect(accountEntity).not.to.be.null;
        expect(accountEntity!.id).to.be.equal(accountID);
        expect(accountEntity!.user_id).to.be.equal(account.user_id);
        expect(accountEntity!.name).to.be.equal(newName);
        expect(accountEntity!.balance).to.be.equal(account.balance);
        expect(accountEntity!.created_at).to.be.a("Date");
        expect(accountEntity!.updated_at).to.be.a("Date");
    });

    it("should set Account balance in DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * accounts.length);
        let account = accounts[i];
        accountEntity = new AccountEntity(account);

        let accountID:number = await factory.AccountModel.add(accountEntity);
        accountEntity = await factory.AccountModel.findByID(accountID);
        
        // ACT
        let newBalance : number = faker.datatype.number()
        
        await factory.AccountModel.setBalance(accountID, newBalance);
        accountEntity = await factory.AccountModel.findByID(accountID);

        // ASSERT
        expect(accountEntity).not.to.be.null;
        expect(accountEntity!.id).to.be.equal(accountID);
        expect(accountEntity!.user_id).to.be.equal(account.user_id);
        expect(accountEntity!.name).to.be.equal(account.name);
        expect(accountEntity!.balance).to.be.equal(newBalance);
        expect(accountEntity!.created_at).to.be.a("Date");
        expect(accountEntity!.updated_at).to.be.a("Date");
    });

    it("should delete Account in DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * accounts.length);
        let account = accounts[i];
        accountEntity = new AccountEntity(account);

        let accountID:number = await factory.AccountModel.add(accountEntity);
        accountEntity = await factory.AccountModel.findByID(accountID);

        // ACT
        await factory.AccountModel.delete(accountEntity!.id!);
        accountEntity = await factory.AccountModel.findByID(accountEntity!.id!);

        // ASSERT
        expect(accountEntity).to.be.null;
    });
 
    it("should delete Account by User", async () => {
        // ARRANGE
        let accountsEntity:AccountEntity[] = accounts.map(account => new AccountEntity(account));
        accountsEntity.map(async a => await factory.AccountModel.add(a));

        // ACT
        await factory.AccountModel.deleteByUser(userID);
        let results = await factory.AccountModel.findAll();

        // ASSERT
        expect(results.length).to.be.equal(0);
    })


    it("should get all accounts in DB", async () => {
        // ARRANGE
        let accountsEntity:AccountEntity[] = accounts.map(account => new AccountEntity(account));
        accountsEntity.map(async a => await factory.AccountModel.add(a));

        // ACT
        let results = await factory.AccountModel.findAll();

        // ASSERT
        expect(results.length).to.be.equal(accounts.length);
    })
});
