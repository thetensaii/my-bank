import 'reflect-metadata';
import { expect } from "chai";
import Container from "typedi";
import { UserConfig, UserEntity } from "../../src/entities/User";
import { Factory } from "../../src/models/Factory"
import faker from "faker/locale/fr"

describe("UserModel test", () => {
    let users:UserConfig[] = [];

    let userEntity:UserEntity|undefined;
    let factory:Factory;
    before(async () => {
        let l = Math.ceil(Math.random() * 15); // Nombre de users

        for(let i = 0; i < l;++i){
            users.push({
                login: faker.internet.userName(),
                firstname : faker.name.firstName(),
                lastname: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            });
        }

        // userEntity = new UserEntity(users[0]);
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
        let userID = Math.ceil(Math.random() * 15);

        // ACT
        userEntity = await factory.UserModel.getByID(userID);

        //ASSERT
        expect(userEntity).to.be.undefined;
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
        userEntity = await factory.UserModel.getByID(userID);

        //ASSERT
        expect(userEntity).not.to.be.undefined;
        expect(userEntity!.id).to.be.equal(userID);
        expect(userEntity!.login).to.be.equal(user.login);
        expect(userEntity!.firstname).to.be.equal(user.firstname);
        expect(userEntity!.lastname).to.be.equal(user.lastname);
        expect(userEntity!.email).to.be.equal(user.email);
        expect(userEntity!.password).to.be.equal(user.password);
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
        userEntity = await factory.UserModel.getByLogin(userEntity.login);

        //ASSERT
        expect(userEntity).not.to.be.undefined;
        expect(userEntity!.id).to.be.equal(userID);
        expect(userEntity!.login).to.be.equal(user.login);
        expect(userEntity!.firstname).to.be.equal(user.firstname);
        expect(userEntity!.lastname).to.be.equal(user.lastname);
        expect(userEntity!.email).to.be.equal(user.email);
        expect(userEntity!.password).to.be.equal(user.password);
        expect(userEntity!.created_at).to.be.a("Date");
        expect(userEntity!.updated_at).to.be.null;
        
    });

    it("should set User in DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * users.length);
        let user = users[i];
        userEntity = new UserEntity(user);

        let userID:number = await factory.UserModel.add(userEntity!);
        userEntity = await factory.UserModel.getByID(userID);
        
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
        userEntity = await factory.UserModel.getByID(userID);

        // ASSERT
        expect(userEntity).not.to.be.undefined;
        expect(userEntity!.id).to.be.equal(userID);
        expect(userEntity!.login).to.be.equal(setUser.login);
        expect(userEntity!.firstname).to.be.equal(setUser.firstname);
        expect(userEntity!.lastname).to.be.equal(setUser.lastname);
        expect(userEntity!.email).to.be.equal(setUser.email);
        expect(userEntity!.password).to.be.equal(users[i].password);
        expect(userEntity!.created_at).to.be.a("Date");
        expect(userEntity!.updated_at).to.be.a("Date");
    });

    it("should delete User in DB", async () => {
        // ARRANGE
        let i = Math.floor(Math.random() * users.length);
        let user = users[i];
        userEntity = new UserEntity(user);

        let userID:number = await factory.UserModel.add(userEntity!);
        userEntity = await factory.UserModel.getByID(userID);
        
        // ACT
        await factory.UserModel.delete(userEntity!.id!);
        userEntity = await factory.UserModel.getByID(userEntity!.id!);

        // ASSERT
        expect(userEntity).to.be.undefined;
    });

    it("should get all users in DB", async () => {
        // ARRANGE
        let usersEntity = users.map(user => new UserEntity(user));
        usersEntity.map(async u => await factory.UserModel.add(u));

        // ACT
        let results = await factory.UserModel.getAll();

        // ASSERT
        expect(results.length).to.be.equal(users.length);
    })

});
