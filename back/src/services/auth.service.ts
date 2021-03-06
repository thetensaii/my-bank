import { Service } from "typedi";
import { UserJSON, UserEntity } from "../entities/user.entity";
import { Factory } from "../models/factory";
import bcrypt from "bcrypt"
import config from "../config"
import { HttpError } from "../core/HttpError";
import { StatusCodes } from "http-status-codes";

@Service({ transient: true })
export class AuthService {
    constructor(private factory: Factory) { }

    async signUp(user: UserJSON): Promise<UserEntity> {
        let userEntity: UserEntity | null;
        user = Object.create(user);
        user.password = await bcrypt.hash(user.password + config.PASSWORD_SALT, config.SALT_ROUNDS)
        userEntity = new UserEntity(user);

        const userByLogin: UserEntity | null = await this.factory.UserModel.findByLogin(user.login)
        if (userByLogin) {
            throw new HttpError(StatusCodes.CONFLICT, "Pseudo déjà utilisé.")
        }

        // Add find by Email
        const userByEmail = await this.factory.UserModel.findByEmail(user.email)
        if (userByEmail) {
            throw new HttpError(StatusCodes.CONFLICT, "Email déjà utilisé.")
        }

        try {
            await this.factory.beginTransaction();
            let userID: number = await this.factory.UserModel.add(userEntity);
            userEntity = await this.factory.UserModel.findByID(userID);

            if (!userEntity) throw new Error();
            await this.factory.commit();

            await this.factory.release();

            return userEntity;

        } catch (error) {
            await this.factory.rollback();
            await this.factory.release();

            throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, "Error while creating user")
        }
    }

    async signIn(login: string, password: string): Promise<UserEntity> {

        let userEntity: UserEntity | null = await this.factory.UserModel.findByLogin(login);
        await this.factory.release();

        if (!userEntity) {
            throw new HttpError(StatusCodes.NOT_FOUND, "L'utilisateur n'existe pas ou mauvais mot de passe");
        }

        let match = await bcrypt.compare(password + config.PASSWORD_SALT, userEntity.password);
        if (match) {
            // Retourner un token
            return userEntity;
        } else {
            throw new HttpError(StatusCodes.NOT_FOUND, "L'utilisateur n'existe pas ou mauvais mot de passe");
        }
    }

}