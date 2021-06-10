import JWT from "jsonwebtoken"
import { UserEntity } from "../entities/user.entity"
import { ObjectToken } from "../types/ObjectToken"
import config from "../config"

export const createUserToken = async (user : UserEntity) : Promise<string> => {
    let payload:ObjectToken = {
        user_id : user.id!,
        login : user.login,
        firstname : user.firstname,
        lastname : user.lastname,
        email : user.email,
        is_admin : user.is_admin,
        exp: Math.floor(Date.now() / 1000) + (config.JWT_TOKEN_EXP_IN_MINUTES * 60)
    };

    let token:string = JWT.sign(payload, config.JWT_SECRET, {noTimestamp:true}); 

    return token;
}

export const verifyUserToken = async (token : string): Promise<ObjectToken> => {
    return <ObjectToken> JWT.verify(token, config.JWT_SECRET);
}

