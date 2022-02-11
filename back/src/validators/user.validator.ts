import Joi, { ValidationError } from "joi";
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export class UserValidator {
    static async findByID(req:Request, res:Response, next:NextFunction) {

        let findByIDSchema:Joi.ObjectSchema = Joi.object({
            id : Joi.number().required()
        }).required();

        try {
            const value = await findByIDSchema.validateAsync(req.params);
            next();
        } catch(error){
            res.status(StatusCodes.BAD_REQUEST).send(error.message);
            console.log(`${StatusCodes.BAD_REQUEST} - ${error.message}`);
        }
    }

    static async changeUser(req:Request, res:Response, next:NextFunction) {

        let IDSchema:Joi.ObjectSchema = Joi.object({
            id : Joi.number().required()
        }).required();

        let ChangeUserSchema:Joi.ObjectSchema = Joi.object({
            login : Joi.string().min(3).required(),
            firstname : Joi.string().min(3).required(),
            lastname : Joi.string().min(2).required(),
            email : Joi.string().email().required()
        }).required();

        try {
            res.locals.changedUser = await ChangeUserSchema.validateAsync(req.body);
            let value = await IDSchema.validateAsync(req.params);
            res.locals.changedUser.id = value.id;
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

    static async changePassword(req:Request, res:Response, next:NextFunction) {

        let IDSchema:Joi.ObjectSchema = Joi.object({
            id : Joi.number().required()
        }).required();
        
        let ChangePasswordSchema:Joi.ObjectSchema = Joi.object({
            password : Joi.string().min(5).required()
        }).required();

        try {
            let value = await ChangePasswordSchema.validateAsync(req.body);
            res.locals.password = value.password;

            value = await IDSchema.validateAsync(req.params);
            res.locals.id = value.id;
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

    static async deleteByID(req:Request, res:Response, next:NextFunction) {

        let deleteByIDSchema:Joi.ObjectSchema = Joi.object({
            id : Joi.number().required()
        }).required();

        try {
            const value = await deleteByIDSchema.validateAsync(req.params);
            next();
        } catch(error){
            res.status(StatusCodes.BAD_REQUEST).send(error.message);
            console.log(`${StatusCodes.BAD_REQUEST} - ${error.message}`);
        }
    }

}