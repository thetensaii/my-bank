import { expect } from "chai";
import { UserJSON, UserEntity } from "../../src/entities/user.entity";
import faker from "faker/locale/fr"

describe("UserEntity test", () => {
    it("should create UserEntity without id, created_at and updated_at", () => {
        let user:UserJSON = {
            login: faker.internet.userName(),
            firstname : faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }

        let userEntity:UserEntity = new UserEntity(user);

        expect(userEntity.id).to.be.null;
        expect(userEntity.login).to.equal(user.login);
        expect(userEntity.firstname).to.equal(user.firstname);
        expect(userEntity.lastname).to.equal(user.lastname);
        expect(userEntity.email).to.equal(user.email);
        expect(userEntity.password).to.equal(user.password);
        expect(userEntity.is_admin).to.be.false;
        expect(userEntity.created_at).to.be.null;
        expect(userEntity.updated_at).to.be.null;
    });

    it("should create UserEntity with id, created_at and updated_at", () => {
        let user:UserJSON = {
            id: faker.datatype.number(),
            login: faker.internet.userName(),
            firstname : faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            is_admin: Boolean(Math.round(Math.random())),
            created_at: faker.date.soon(),
            updated_at: faker.date.future()
        }

        let userEntity:UserEntity = new UserEntity(user);


        expect(userEntity.id).to.equal(user.id);
        expect(userEntity.login).to.equal(user.login);
        expect(userEntity.firstname).to.equal(user.firstname);
        expect(userEntity.lastname).to.equal(user.lastname);
        expect(userEntity.email).to.equal(user.email);
        expect(userEntity.password).to.equal(user.password);
        expect(userEntity.is_admin).to.equal(user.is_admin);
        expect(userEntity.created_at).to.equal(user.created_at);
        expect(userEntity.updated_at).to.equal(user.updated_at);
    });

    it("should create UserEntity with id and created_at without updated_at", () => {
        let user:UserJSON = {
            id: faker.datatype.number(),
            login: faker.internet.userName(),
            firstname : faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            created_at: faker.date.soon()
        }

        let userEntity:UserEntity = new UserEntity(user);

        expect(userEntity.id).to.equal(user.id);
        expect(userEntity.login).to.equal(user.login);
        expect(userEntity.firstname).to.equal(user.firstname);
        expect(userEntity.lastname).to.equal(user.lastname);
        expect(userEntity.email).to.equal(user.email);
        expect(userEntity.password).to.equal(user.password);
        expect(userEntity.is_admin).to.be.false;
        expect(userEntity.created_at).to.equal(user.created_at);
        expect(userEntity.updated_at).to.be.null;
    });

    it("should set UserEntity", () => {

        let user:UserJSON = {
            id: faker.datatype.number(),
            login: faker.internet.userName(),
            firstname : faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            is_admin: Boolean(Math.round(Math.random())),
            created_at: faker.date.soon()
        }

        let userEntity:UserEntity = new UserEntity(user);

        let newUser = {
            id: faker.datatype.number(),
            login: faker.internet.userName(),
            firstname : faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            is_admin: Boolean(Math.round(Math.random()))
        }

        userEntity.id = newUser.id;
        userEntity.login = newUser.login;
        userEntity.firstname = newUser.firstname;
        userEntity.lastname = newUser.lastname;
        userEntity.email = newUser.email;
        userEntity.is_admin = newUser.is_admin;
        
        expect(userEntity.id).to.equal(newUser.id);
        expect(userEntity.login).to.equal(newUser.login);
        expect(userEntity.firstname).to.equal(newUser.firstname);
        expect(userEntity.lastname).to.equal(newUser.lastname);
        expect(userEntity.email).to.equal(newUser.email);
        expect(userEntity.password).to.equal(user.password);
        expect(userEntity.is_admin).to.equal(newUser.is_admin);
        expect(userEntity.created_at).to.equal(user.created_at);
        expect(userEntity.updated_at).to.be.null;
    });
});