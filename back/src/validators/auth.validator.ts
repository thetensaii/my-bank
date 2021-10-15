import Joi, { ValidationError } from "joi";
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserJSON } from "../entities/user.entity";

export class AuthValidator {
    static async signUp(req:Request, res:Response, next:NextFunction) {

        let signUpSchema:Joi.ObjectSchema = Joi.object({
            login : Joi.string().min(3).required(),
            firstname : Joi.string().min(3).required(),
            lastname : Joi.string().min(2).required(),
            email : Joi.string().email().required(),
            password : Joi.string().min(5).required()
        }).required().options({abortEarly : false});

        try {
            const value:UserJSON = await signUpSchema.validateAsync(req.body);
            res.locals.user = value;
            next();
        } catch(error){
            if(error instanceof ValidationError){
                const errors = error.details.map(d => d.message)
                res.status(StatusCodes.BAD_REQUEST).send({
                    errors : errors
                });
                console.log(`${StatusCodes.BAD_REQUEST} - ${error.message}`)
            } else if(error instanceof Error){
                res.status(StatusCodes.BAD_REQUEST).send(error.message);
                console.log(`${StatusCodes.BAD_REQUEST} - ${error.message}`)
            }
        }
    
    }

    static async signIn(req:Request, res:Response, next:NextFunction) {
        // No min length because people don't have to get those errors when they try to sign in
        let signInSchema:Joi.ObjectSchema = Joi.object({
            login : Joi.string().required(),
            password : Joi.string().required()
        }).required().options({abortEarly : false});

        try {
            const value = await signInSchema.validateAsync(req.body);
            res.locals.user = value;
            next();
        } catch(error){
            if(error instanceof ValidationError){
                const errors = error.details.map(d => d.message)
                res.status(StatusCodes.BAD_REQUEST).send({
                    errors : errors
                });
                console.log(`${StatusCodes.BAD_REQUEST} - ${error.message}`)
            } else if(error instanceof Error){
                res.status(StatusCodes.BAD_REQUEST).send(error.message);
                console.log(`${StatusCodes.BAD_REQUEST} - ${error.message}`)
            }
        }
    
    }

}