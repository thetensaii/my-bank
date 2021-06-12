import 'reflect-metadata';
import { expect } from "chai";
import Container from "typedi";
import { UserJSON, UserEntity } from "../../src/entities/user.entity";
import { AccountJSON, AccountEntity } from "../../src/entities/account.entity";
import { OperationJSON, OperationEntity } from "../../src/entities/operation.entity"
import { Factory } from "../../src/models/factory"
import faker from "faker/locale/fr"

describe("OperationModel test", () => {
    let user:UserJSON;
    let userEntity:UserEntity|null;
    let userID:number;

    let accounts:AccountJSON[] = [];
    let accountsEntity:AccountEntity[];
    let accountID:number;

    let operations:OperationJSON[] = [];
    let operationEntity: OperationEntity|null;

    let factory:Factory;

    let l_accounts = Math.ceil(Math.random() * 5); // number of accounts
    let l_operations = Math.ceil(Math.random() * 15); // number of operations

    before(async () => {
        if(l_accounts < 2) l_accounts = 2;
        if(l_operations < 2) l_operations = 2;

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


        // SETTING UP ACCOUNTS
        for(let i = 0; i < l_accounts; ++i){
            accounts.push({
                user_id : userID,
                name : faker.vehicle.vehicle(),
                balance : faker.datatype.number()
            })
        }

        accountsEntity = accounts.map(account => new AccountEntity(account));
        accountsEntity.map(async a => await factory.AccountModel.add(a));
        accountsEntity = await factory.AccountModel.findAll();
        accountID = accountsEntity[0]!.id!;

        // SETTING UP 1ST ACCOUNT OPERATIONS
        for(let i = 0; i < l_operations; ++i){
            operations.push({
                account_id : accountID,
                amount : faker.datatype.number(),
                comment : faker.lorem.text()
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
        accountsEntity.map(async a => await factory.AccountModel.delete(a!.id!));
        await factory.UserModel.delete(userID);
        await factory.release();
    })

    it("should find nothing in DB", async () => {
        // ARRANGE
        let operationID = faker.datatype.number();

        // ACT
        operationEntity = await factory.OperationModel.findByID(operationID);

        //ASSERT
        expect(operationEntity).to.be.null;
    });

    it("should add Account to DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * operations.length);
        let operation = operations[i];
        operationEntity = new OperationEntity(operation);

        // ACT
        let operationID:number = await factory.OperationModel.add(operationEntity!);

        // ASSERT
        expect(operationID).to.be.a("number");
    });

    it("should find Account by ID in DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * operations.length);
        let operation = operations[i];
        operationEntity = new OperationEntity(operation);

        let operationID:number = await factory.OperationModel.add(operationEntity!);

        // ACT
        operationEntity = await factory.OperationModel.findByID(operationID);

        //ASSERT
        expect(operationEntity).not.to.be.null;
        expect(operationEntity!.id).to.be.equal(operationID);
        expect(operationEntity!.amount).to.be.equal(operation.amount);
        expect(operationEntity!.comment).to.be.equal(operation.comment);
        expect(operationEntity!.created_at).to.be.a("Date");
        expect(operationEntity!.updated_at).to.be.null;
    });

    it("should find Operations by AccountID in DB", async () => {
        // ARRANGE
        let accountID2:number = accountsEntity[1]!.id!;

        for(let i = 0; i < 3; ++i){
            let operation:OperationJSON = {
                account_id : accountID2,
                amount : faker.datatype.number(),
                comment : faker.lorem.text()
            }
            operationEntity = new OperationEntity(operation);
            await factory.OperationModel.add(operationEntity);
        }

        let operationsEntity:OperationEntity[] = operations.map(operation => new OperationEntity(operation));
        operationsEntity.map(async o => await factory.OperationModel.add(o));

        // ACT
        let account1_Operations = await factory.OperationModel.findByAccountID(accountID);

        // ASSERT
        expect(account1_Operations.length).to.be.equal(operations.length)
    })

    // it("should set Operation in DB", async () => {
    //     // ARRANGE
    //     let i = Math.floor(Math.random() * operations.length);
    //     let operation = operations[i];
    //     operationEntity = new OperationEntity(operation);

    //     let operationID:number = await factory.OperationModel.add(operationEntity);
    //     operationEntity = await factory.OperationModel.findByID(operationID);
        
    //     // ACT
    //     let setOperation = {
    //         amount : faker.datatype.number()
    //     }

    //     operationEntity!.amount = setOperation.amount;
        
    //     await factory.OperationModel.set(operationEntity!);
    //     operationEntity = await factory.OperationModel.findByID(operationID);

    //     // ASSERT
    //     expect(operationEntity).not.to.be.null;
    //     expect(operationEntity!.id).to.be.equal(operationID);
    //     expect(operationEntity!.account_id).to.be.equal(accountID);
    //     expect(operationEntity!.amount).to.be.equal(setOperation.amount);
    //     expect(operationEntity!.created_at).to.be.a("Date");
    //     expect(operationEntity!.updated_at).to.be.a("Date");
    // });

    it("should delete Operation in DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * operations.length);
        let operation = operations[i];
        operationEntity = new OperationEntity(operation);


        let operationID:number = await factory.OperationModel.add(operationEntity);
        operationEntity = await factory.OperationModel.findByID(operationID);

        // ACT
        await factory.OperationModel.delete(operationEntity!.id!);
        operationEntity = await factory.OperationModel.findByID(operationEntity!.id!);

        // ASSERT
        expect(operationEntity).to.be.null;
    });

    it("should get all Operations in DB", async () => {
        // ARRANGE
        let operationsEntity:OperationEntity[] = operations.map(operation => new OperationEntity(operation));
        operationsEntity.map(async o => await factory.OperationModel.add(o));

        // ACT
        let results = await factory.OperationModel.findAll();

        // ASSERT
        expect(results.length).to.be.equal(operations.length);
    })
});
