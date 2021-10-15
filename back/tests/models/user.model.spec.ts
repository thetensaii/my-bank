import 'reflect-metadata';
import { expect } from "chai";
import Container from "typedi";
import { UserJSON, UserEntity } from "../../src/entities/user.entity";
import { Factory } from "../../src/models/factory"
import faker from "faker/locale/fr"

describe("UserModel test", () => {
    let users:UserJSON[] = [];

    let userEntity:UserEntity|null;
    let factory:Factory;
    before(async () => {
        let l = Math.ceil(Math.random() * 15); // Nombre de users

        for(let i = 0; i < l;++i){
            users.push({
                login: faker.internet.userName(),
                firstname : faker.name.firstName(),
                lastname: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                is_admin: Boolean(Math.round(Math.random()))
            });
        }
        
        factory = Container.get(Factory); 
    })

    beforeEach(async () => {
        await factory.beginTransaction();
    });
    
    afterEach(async () => {
        await factory.rollback();
    });

    after(async () => {
        await factory.release();
    })

    it("should find nothing in DB", async () => {
        // ARRANGE
        let userID = faker.datatype.number();

        // ACT
        userEntity = await factory.UserModel.findByID(userID);

        //ASSERT
        expect(userEntity).to.be.null;
    });

    it("should add User to DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * users.length);
        let user = users[i];
        userEntity = new UserEntity(user);

        // ACT
        let userID:number = await factory.UserModel.add(userEntity!);

        // ASSERT
        expect(userID).to.be.a("number");
    })


    it("should find User by ID in DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * users.length);
        let user = users[i];
        userEntity = new UserEntity(user);

        let userID:number = await factory.UserModel.add(userEntity!);

        // ACT
        userEntity = await factory.UserModel.findByID(userID);

        //ASSERT
        expect(userEntity).not.to.be.null;
        expect(userEntity!.id).to.be.equal(userID);
        expect(userEntity!.login).to.be.equal(user.login);
        expect(userEntity!.firstname).to.be.equal(user.firstname);
        expect(userEntity!.lastname).to.be.equal(user.lastname);
        expect(userEntity!.email).to.be.equal(user.email);
        expect(userEntity!.password).to.be.equal(user.password);
        expect(userEntity!.is_admin).to.be.equal(user.is_admin);
        expect(userEntity!.created_at).to.be.a("Date");
        expect(userEntity!.updated_at).to.be.null;
        
    });

    it("should find User by login in DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * users.length);
        let user = users[i];
        userEntity = new UserEntity(user);

        let userID:number = await factory.UserModel.add(userEntity!);

        // ACT
        userEntity = await factory.UserModel.findByLogin(userEntity.login);

        //ASSERT
        expect(userEntity).not.to.be.null;
        expect(userEntity!.id).to.be.equal(userID);
        expect(userEntity!.login).to.be.equal(user.login);
        expect(userEntity!.firstname).to.be.equal(user.firstname);
        expect(userEntity!.lastname).to.be.equal(user.lastname);
        expect(userEntity!.email).to.be.equal(user.email);
        expect(userEntity!.password).to.be.equal(user.password);
        expect(userEntity!.is_admin).to.be.equal(user.is_admin);
        expect(userEntity!.created_at).to.be.a("Date");
        expect(userEntity!.updated_at).to.be.null;
        
    });

    it("should find User by email in DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * users.length);
        let user = users[i];
        userEntity = new UserEntity(user);

        let userID:number = await factory.UserModel.add(userEntity!);

        // ACT
        userEntity = await factory.UserModel.findByEmail(userEntity.email);

        //ASSERT
        expect(userEntity).not.to.be.null;
        expect(userEntity!.id).to.be.equal(userID);
        expect(userEntity!.login).to.be.equal(user.login);
        expect(userEntity!.firstname).to.be.equal(user.firstname);
        expect(userEntity!.lastname).to.be.equal(user.lastname);
        expect(userEntity!.email).to.be.equal(user.email);
        expect(userEntity!.password).to.be.equal(user.password);
        expect(userEntity!.is_admin).to.be.equal(user.is_admin);
        expect(userEntity!.created_at).to.be.a("Date");
        expect(userEntity!.updated_at).to.be.null;
        
    });

    it("should set User in DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * users.length);
        let user = users[i];
        userEntity = new UserEntity(user);

        let userID:number = await factory.UserModel.add(userEntity!);
        userEntity = await factory.UserModel.findByID(userID);
        
        // ACT
        let setUser = {
            login : faker.internet.userName(),
            firstname : faker.name.firstName(),
            lastname : faker.name.lastName(),
            email : faker.internet.email()
        }
        userEntity!.login = setUser.login;
        userEntity!.firstname = setUser.firstname;
        userEntity!.lastname = setUser.lastname;
        userEntity!.email = setUser.email;
        
        await factory.UserModel.set(userEntity!);
        userEntity = await factory.UserModel.findByID(userID);

        // ASSERT
        expect(userEntity!.id).to.be.equal(userID);
        expect(userEntity!.login).to.be.equal(setUser.login);
        expect(userEntity!.firstname).to.be.equal(setUser.firstname);
        expect(userEntity!.lastname).to.be.equal(setUser.lastname);
        expect(userEntity!.email).to.be.equal(setUser.email);
        expect(userEntity!.password).to.be.equal(user.password);
        expect(userEntity!.is_admin).to.be.equal(user.is_admin);
        expect(userEntity!.created_at).to.be.a("Date");
        expect(userEntity!.updated_at).to.be.a("Date");
    });

    it("should delete User in DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * users.length);
        let user = users[i];
        userEntity = new UserEntity(user);

        let userID:number = await factory.UserModel.add(userEntity!);
        userEntity = await factory.UserModel.findByID(userID);
        
        // ACT
        await factory.UserModel.delete(userEntity!.id!);
        userEntity = await factory.UserModel.findByID(userEntity!.id!);

        // ASSERT
        expect(userEntity).to.be.null;
    });

    it("should get all users in DB", async () => {
        // ARRANGE
        let usersEntity = users.map(user => new UserEntity(user));
        await usersEntity.map(async u => await factory.UserModel.add(u));

        // ACT
        let results = await factory.UserModel.findAll();

        // ASSERT
        expect(results.length).to.be.equal(users.length);
    })

});
