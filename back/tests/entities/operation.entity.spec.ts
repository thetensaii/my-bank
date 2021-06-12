import {expect} from "chai"
import {OperationJSON, OperationEntity} from "../../src/entities/operation.entity"
import faker from "faker/locale/fr"

describe("OperationEntity test", () => {
    it("should create OperationEntity without id, created_at and updated_at", () => {
        let operation:OperationJSON = {
            account_id: faker.datatype.number(),
            amount: faker.datatype.number(),
            comment : faker.lorem.text()
        }

        let operationEntity:OperationEntity = new OperationEntity(operation);

        expect(operationEntity.id).to.be.null;
        expect(operationEntity.account_id).to.equal(operation.account_id);
        expect(operationEntity.amount).to.equal(operation.amount);
        expect(operationEntity.comment).to.equal(operation.comment);
        expect(operationEntity.created_at).to.be.null;
        expect(operationEntity.updated_at).to.be.null;
    });

    it("should create OperationEntity with id, created_at and updated_at", () => {
        let operation:OperationJSON = {
            id: faker.datatype.number(),
            account_id: faker.datatype.number(),
            amount: faker.datatype.number(),
            comment : faker.lorem.text(),
            created_at: faker.date.soon(),
            updated_at: faker.date.future()
        }

        let operationEntity:OperationEntity = new OperationEntity(operation);

        expect(operationEntity.id).to.equal(operation.id);
        expect(operationEntity.account_id).to.equal(operation.account_id);
        expect(operationEntity.amount).to.equal(operation.amount);
        expect(operationEntity.comment).to.equal(operation.comment);
        expect(operationEntity.created_at).to.equal(operation.created_at);
        expect(operationEntity.updated_at).to.equal(operation.updated_at);
    });

    it("should create OperationEntity with id and created_at without updated_at", () => {
        let operation:OperationJSON = {
            id: faker.datatype.number(),
            account_id: faker.datatype.number(),
            amount: faker.datatype.number(),
            comment : faker.lorem.text(),
            created_at: faker.date.soon()
        }

        let operationEntity:OperationEntity = new OperationEntity(operation);

        expect(operationEntity.id).to.equal(operation.id);
        expect(operationEntity.account_id).to.equal(operation.account_id);
        expect(operationEntity.amount).to.equal(operation.amount);
        expect(operationEntity.comment).to.equal(operation.comment);
        expect(operationEntity.created_at).to.equal(operation.created_at);
        expect(operationEntity.updated_at).to.null;
    });

    it("should set OperationEntity", () => {
        let operation:OperationJSON = {
            id: faker.datatype.number(),
            account_id: faker.datatype.number(),
            amount: faker.datatype.number(),
            comment : faker.lorem.text(),
            created_at: faker.date.soon()
        }

        let operationEntity:OperationEntity = new OperationEntity(operation);

        let newOperation = {
            id: faker.datatype.number(),
            account_id: faker.datatype.number(),
            amount: faker.datatype.number(),
            comment : faker.lorem.text()
        }

        operationEntity.id = newOperation.id;
        operationEntity.account_id = newOperation.account_id;
        operationEntity.amount = newOperation.amount;
        operationEntity.comment = newOperation.comment;


        expect(operationEntity.id).to.equal(newOperation.id);
        expect(operationEntity.account_id).to.equal(newOperation.account_id);
        expect(operationEntity.amount).to.equal(newOperation.amount);
        expect(operationEntity.comment).to.equal(newOperation.comment);
        expect(operationEntity.created_at).to.equal(operation.created_at);
        expect(operationEntity.updated_at).to.null;
    });

});