import 'reflect-metadata';
import { expect } from "chai";
import Container from "typedi";
import faker from "faker/locale/fr"
import { UserJSON, UserEntity, UserPublicJSON } from "../../src/entities/user.entity";
import { UserService } from "../../src/services/user.service"
import { AuthService } from "../../src/services/auth.service"
import MySQLDatabase from '../../src/core/mysql.database';
import mysql from "promise-mysql";

describe("UserService test", () => {
    let userService:UserService;
    let user:UserJSON;
    let users:UserJSON[] = [];
    let userEntity:UserEntity|null;

    let authService:AuthService;

    before(async () => {
        let l:number = Math.ceil(Math.random() * 15); // Nombre de users

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

    });

    beforeEach(async () => {    
        authService = Container.get(AuthService);
    })

    afterEach(async () => {    
        let db:MySQLDatabase = Container.get(MySQLDatabase);
        let conn:mysql.PoolConnection = await db.getConnection();

        await conn.query("DELETE FROM users");
        await conn.release();
    })

    it("should find null", async () => {
        // ARRANGE
        userService = Container.get(UserService);

        // ACT
        userEntity = await userService.findByID(faker.datatype.number())

        // ASSERT
        expect(userEntity).to.be.null;
    });


    it("should find User info", async () => {
        // ARRANGE
        let i:number = Math.floor(Math.random() * users.length);
        user = users[i];
        userEntity = await authService.signUp(user);
        userService = Container.get(UserService);
        
        // ACT
        userEntity = await userService.findByID(userEntity.id!)

        // ASSERT
        expect(userEntity).not.to.be.null
        expect(userEntity?.id).to.be.a("number")
        expect(userEntity?.login).to.be.equal(user.login);
        expect(userEntity?.firstname).to.be.equal(user.firstname);
        expect(userEntity?.lastname).to.be.equal(user.lastname);
        expect(userEntity?.email).to.be.equal(user.email);
        expect(userEntity?.password).to.be.a("string");
        expect(userEntity?.is_admin).to.be.equal(user.is_admin);
        expect(userEntity?.created_at).to.be.a("Date");
        expect(userEntity?.updated_at).to.be.null;
    });

    it("should change User info", async () => {
        // ARRANGE
        let i:number = Math.floor(Math.random() * users.length);
        user = users[i];
        
        userEntity = await authService.signUp(user);
        let u:UserPublicJSON = {
            id : userEntity!.id,
            login: faker.internet.userName(),
            firstname : faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            is_admin: Boolean(Math.round(Math.random()))
        }
        userService = Container.get(UserService);
        
        // ACT
        userEntity = await userService.changeUser(u)

        // ASSERT
        expect(userEntity?.id).to.be.a.a("number")
        expect(userEntity?.login).to.be.equal(u.login);
        expect(userEntity?.firstname).to.be.equal(u.firstname);
        expect(userEntity?.lastname).to.be.equal(u.lastname);
        expect(userEntity?.email).to.be.equal(u.email);
        expect(userEntity?.password).to.be.a("string");
        expect(userEntity?.is_admin).to.be.equal(user.is_admin);
        expect(userEntity?.created_at).to.be.a("Date");
        expect(userEntity?.updated_at).to.be.a("Date");
    });

    it("should get all users", async () => {
        // ARRANGE
        for(let u of users){
            authService = Container.get(AuthService);
            await authService.signUp(u);
        }
        userService = Container.get(UserService);
        
        // ACT
        let results:UserEntity[] = await userService.findAll();

        // ASSERT
        expect(results.length).to.be.equal(users.length);
    })

    it("should change User Password", async () => {
        // ARRANGE
        let i:number = Math.floor(Math.random() * users.length);
        user = users[i];
        userEntity = await authService.signUp(user);
        userService = Container.get(UserService);

        let userPublic:UserPublicJSON = userEntity.toPublicJSON();
        let newPassword = faker.internet.password();
        // ACT

        userEntity = await userService.changePassword(userPublic, newPassword);

        // ASSERT
        expect(userEntity).not.to.be.null
        expect(userEntity?.id).to.be.a("number")
        expect(userEntity?.login).to.be.equal(user.login);
        expect(userEntity?.firstname).to.be.equal(user.firstname);
        expect(userEntity?.lastname).to.be.equal(user.lastname);
        expect(userEntity?.email).to.be.equal(user.email);
        expect(userEntity?.password).to.be.a("string");
        expect(userEntity?.is_admin).to.be.equal(user.is_admin);
        expect(userEntity?.created_at).to.be.a("Date");
        expect(userEntity?.updated_at).to.be.a("Date");
    })

    it("should delete User", async () => {
        // ARRANGE
        let i:number = Math.floor(Math.random() * users.length);
        user = users[i];
        userEntity = await authService.signUp(user);
        userService = Container.get(UserService);
        
        let userID:number = userEntity.id!;
        
        // ACT
        await userService.delete(userEntity.toPublicJSON(), userID);
        
        // ASSERT
        userService = Container.get(UserService);
        userEntity = await userService.findByID(userID);

        expect(userEntity).to.be.null;
    });

});
