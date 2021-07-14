import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyUserToken } from "../core/JWT";
import { ObjectToken } from '../types/ObjectToken';
import { Container } from 'typedi';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { HttpError } from "../core/HttpError";

export class AuthMiddleware {
    static async isAuth(req:Request, res:Response, next:NextFunction){
        if(!req.cookies.token){
            res.sendStatus(StatusCodes.UNAUTHORIZED);
            return;
        }

        let token:string = req.cookies.token;
        let user:ObjectToken;

        try { 
            user = await verifyUserToken(token);
        } catch(error){
            console.log(error)
            res.sendStatus(StatusCodes.UNAUTHORIZED);
            return;
        }

        let userService:UserService = Container.get(UserService);
        let userEntity:UserEntity|null = await userService.findByID(user.id);
        if(!userEntity){
            res.status(StatusCodes.NOT_FOUND).send("User doesn't exist");
            return;
        }

        res.locals.user = userEntity.toPublicJSON();

        next() 
    }
}