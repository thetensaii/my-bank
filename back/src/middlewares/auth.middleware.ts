import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyUserToken } from "../core/JWT";
import { ObjectToken } from '../types/ObjectToken';

export class AuthMiddleware {
    static async isAuth(req:Request, res:Response, next:NextFunction){
        if(!req.cookies.token){
            res.sendStatus(StatusCodes.UNAUTHORIZED);
            return;
        }

        let token:string = req.cookies.token;
        
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