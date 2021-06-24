import Joi from "joi";
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export class UserValidator {

    static async findByID(req:Request, res:Response, next:NextFunction) {

        let findByIDSchema:Joi.ObjectSchema = Joi.object({
            id : Joi.number().required()
        }).required();

        try {
            const value = await findByIDSchema.validateAsync(req.params);
            next()
        } catch(error){
            res.status(StatusCodes.BAD_REQUEST).send(error.message);
            console.log(`${StatusCodes.BAD_REQUEST} - ${error.message}`)
        }
    
    }


}