import Joi from "joi";
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export class AuthValidator {
    static async signUp(req:Request, res:Response, next:NextFunction) {

        let signUpSchema:Joi.ObjectSchema = Joi.object({
            login : Joi.string().min(3).required(),
            firstname : Joi.string().min(3).required(),
            lastname : Joi.string().min(2).required(),
            email : Joi.string().email().required(),
            password : Joi.string().min(5).required()
        }).required();

        try {
            const value = await signUpSchema.validateAsync(req.body);
            res.locals.user = value;
            next();
        } catch(error){
            res.status(StatusCodes.BAD_REQUEST).send(error.message);
            console.log(`${StatusCodes.BAD_REQUEST} - ${error.message}`)
        }
    
    }

    static async signIn(req:Request, res:Response, next:NextFunction) {

        let signInSchema:Joi.ObjectSchema = Joi.object({
            login : Joi.string().min(3).required(),
            password : Joi.string().min(5).required()
        }).required();

        try {
            const value = await signInSchema.validateAsync(req.body);
            res.locals.user = value;
            next();
        } catch(error){
            res.status(StatusCodes.BAD_REQUEST).send(error.message);
            console.log(`${StatusCodes.BAD_REQUEST} - ${error.message}`)
        }
    
    }

}