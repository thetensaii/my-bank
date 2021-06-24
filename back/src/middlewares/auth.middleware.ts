import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyUserToken } from "../core/JWT";
import { ObjectToken } from '../types/ObjectToken';

export class AuthMiddleware {
    static async isAuth(req:Request, res:Response, next:NextFunction){
        if(!req.headers.authorization){
            res.sendStatus(StatusCodes.UNAUTHORIZED);
            return;
        }
        
        let auth:string = req.headers.authorization;
        let scheme:string = auth.split(" ")[0];
        let token:string = auth.split(" ")[1];

        if(scheme !== "Bearer"){
            res.sendStatus(StatusCodes.UNAUTHORIZED);
            return;
        } 

        try { 
            let user:ObjectToken = await verifyUserToken(token);
            res.locals.user = user;
            next() 
        } catch(error){
            console.log(error)
            res.sendStatus(StatusCodes.UNAUTHORIZED);
        }
    }
}