import { Service } from "typedi";
import { UserConfig, UserEntity } from "../entities/User";
import { Factory } from "../models/Factory";
import bcrypt from "bcrypt"
import config from "../config"


@Service()
export class UserService {
    constructor(private factory:Factory){}

    async signUp(user:UserConfig):Promise<UserEntity>{
        let userEntity:UserEntity|undefined;
        try {
            this.factory.beginTransaction();
            user.password = await bcrypt.hash(user.password, config.SALT_ROUNDS)
            userEntity = new UserEntity(user);
            let userID:number = await this.factory.UserModel.add(userEntity);
            userEntity = await this.factory.UserModel.getByID(userID);

            this.factory.commit();
            
        }catch(error){
            this.factory.rollback();
        }

        return userEntity!;
    }

    async login(login:string, password:string){
        this.factory.beginTransaction();

        let userEntity:UserEntity|undefined = await this.factory.UserModel.getByLogin(login);
        if(userEntity === undefined) return false;

        let match = await bcrypt.compare(password, userEntity.password);
    }
}

