import { expect } from "chai";
import {AccountConfig, AccountEntity} from "../../src/entities/Account"
import faker from "faker/locale/fr"

describe("AccountEntity test", () => {

    it("should create AccountEntity without id, created_at and updated_at", () => {
        // ARRANGE
        let account:AccountConfig = {
            user_id: faker.datatype.number(),
            name : faker.random.word(),
            balance: faker.datatype.number()
        }

        // ACT
        let accountEntity:AccountEntity = new AccountEntity(account);

        // ASSERT
        expect(accountEntity.id).to.be.null;
        expect(accountEntity.user_id).to.equal(account.user_id);
        expect(accountEntity.name).to.equal(account.name);
        expect(accountEntity.balance).to.equal(account.balance);
        expect(accountEntity.created_at).to.be.null;
        expect(accountEntity.updated_at).to.be.null;
    });

    it("should create AccountEntity with id, created_at and updated_at", () => {
        // ARRANGE
        let account:AccountConfig = {
            id: faker.datatype.number(),
            user_id: faker.datatype.number(),
            name : faker.random.word(),
            balance: faker.datatype.number(),
            created_at: faker.date.soon(),
            updated_at: faker.date.future()
        }

        // ACT
        let accountEntity:AccountEntity = new AccountEntity(account);

        // ASSERT
        expect(accountEntity.id).to.equal(account.id);
        expect(accountEntity.user_id).to.equal(account.user_id);
        expect(accountEntity.name).to.equal(account.name);
        expect(accountEntity.balance).to.equal(account.balance);
        expect(accountEntity.created_at).to.equal(account.created_at);
        expect(accountEntity.updated_at).to.equal(account.updated_at);
    });

    it("should create AccountEntity with id and created_at without updated_at", () => {
        // ARRANGE
        let account:AccountConfig = {
            id: faker.datatype.number(),
            user_id: faker.datatype.number(),
            name : faker.random.word(),
            balance: faker.datatype.number(),
            created_at: faker.date.soon()
        }

        // ACT
        let accountEntity:AccountEntity = new AccountEntity(account);

        // ASSERT
        expect(accountEntity.id).to.equal(account.id);
        expect(accountEntity.user_id).to.equal(account.user_id);
        expect(accountEntity.name).to.equal(account.name);
        expect(accountEntity.balance).to.equal(account.balance);
        expect(accountEntity.created_at).to.equal(account.created_at);
        expect(accountEntity.updated_at).to.null;
    });

    it("should set AccountEntity", () => {
        // ARRANGE
        let account:AccountConfig = {
            id: faker.datatype.number(),
            user_id: faker.datatype.number(),
            name : faker.random.word(),
            balance: faker.datatype.number(),
            created_at: faker.date.soon()
        }

        let accountEntity:AccountEntity = new AccountEntity(account);

        // ACT
        let newAccount = {
            id: faker.datatype.number(),
            user_id: faker.datatype.number(),
            name : faker.random.word(),
            balance: faker.datatype.number()
        }

        accountEntity.id = newAccount.id;
        accountEntity.user_id = newAccount.user_id;
        accountEntity.name = newAccount.name;
        accountEntity.balance = newAccount.balance;

        // ASSERT
        expect(accountEntity.id).to.equal(newAccount.id);
        expect(accountEntity.user_id).to.equal(newAccount.user_id);
        expect(accountEntity.name).to.equal(newAccount.name);
        expect(accountEntity.balance).to.equal(newAccount.balance);
        expect(accountEntity.created_at).to.equal(account.created_at);
        expect(accountEntity.updated_at).to.null;
    });


})