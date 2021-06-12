import 'reflect-metadata';
import { expect } from "chai";
import Container from "typedi";
import faker from "faker/locale/fr"
import { UserJSON, UserEntity } from "../../src/entities/user.entity";
import { AuthService } from "../../src/services/auth.service"
import MySQLDatabase from '../../src/core/mysql.database';
import mysql from "promise-mysql";

describe("AuthService test", () => {
    let authService:AuthService;
    let user:UserJSON;
    let userEntity:UserEntity;

    before(async () => {
        
        user = {
            login: faker.internet.userName(),
            firstname : faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            is_admin: Boolean(Math.round(Math.random()))
        }
    });

    afterEach(async () => {    
        let db:MySQLDatabase = Container.get(MySQLDatabase);
        let conn:mysql.PoolConnection = await db.getConnection();

        await conn.query("DELETE FROM users");
        // await conn.release();
    })

    it("should sign up a User", async () => {
        // ARRANGE
        authService = Container.get(AuthService);

        // ACT
        userEntity = await authService.signUp(user);

        // ASSERT
        expect(userEntity.id).to.be.a.a("number")
        expect(userEntity.login).to.be.equal(user.login);
        expect(userEntity.firstname).to.be.equal(user.firstname);
        expect(userEntity.lastname).to.be.equal(user.lastname);
        expect(userEntity.email).to.be.equal(user.email);
        expect(userEntity.password).to.be.a("string");
        expect(userEntity.is_admin).to.be.equal(user.is_admin);
        expect(userEntity.created_at).to.be.a("Date");
        expect(userEntity.updated_at).to.be.null;
    });

    it("should return User info", async () => {
        // ARRANGE
        authService = Container.get(AuthService);
        userEntity = await authService.signUp(user);
        
        authService = Container.get(AuthService);
        
        // ACT
        userEntity = await authService.login(user.login, user.password);

        // ASSERT
        expect(userEntity.id).to.be.a.a("number")
        expect(userEntity.login).to.be.equal(user.login);
        expect(userEntity.firstname).to.be.equal(user.firstname);
        expect(userEntity.lastname).to.be.equal(user.lastname);
        expect(userEntity.email).to.be.equal(user.email);
        expect(userEntity.password).to.be.a("string");
        expect(userEntity.is_admin).to.be.equal(user.is_admin);
        expect(userEntity.created_at).to.be.a("Date");
        expect(userEntity.updated_at).to.be.null;
    });
    
});
