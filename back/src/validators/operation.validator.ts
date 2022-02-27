import Joi from "joi";
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { OperationJSON } from "../entities/operation.entity";

export class OperationValidator {
    static async findByID(req:Request, res:Response, next:NextFunction) {

        let findByIDSchema:Joi.ObjectSchema = Joi.object({
            id : Joi.number().required()
        }).required();

        try {
            const value = await findByIDSchema.validateAsync(req.params);
            res.locals.id = value.id;
            next();
        } catch(error){
            res.status(StatusCodes.BAD_REQUEST).send(error.message);
            console.log(`${StatusCodes.BAD_REQUEST} - ${error.message}`);
        }
    }

    static async findByAccountID(req:Request, res:Response, next:NextFunction) {

        let findByUserIDSchema:Joi.ObjectSchema = Joi.object({
            id : Joi.number().required()
        }).required();

        try {
            const value = await findByUserIDSchema.validateAsync(req.params);
            res.locals.accountID = value.id;

            next();
        } catch(error){
            res.status(StatusCodes.BAD_REQUEST).send(error.message);
            console.log(`${StatusCodes.BAD_REQUEST} - ${error.message}`);
        }
    }

    static async create(req:Request, res:Response, next:NextFunction) {

        let createSchema:Joi.ObjectSchema = Joi.object({
            account_id : Joi.number().required(),
            amount : Joi.number().precision(2).required(),
            comment : Joi.string().required()
        }).required();

        try {
            const value:OperationJSON = await createSchema.validateAsync(req.body);
            res.locals.operation = value;
            
            next();
        } catch(error){
            res.status(StatusCodes.BAD_REQUEST).send(error.message);
            console.log(`${StatusCodes.BAD_REQUEST} - ${error.message}`);
        }
    }


    static async deleteByID(req:Request, res:Response, next:NextFunction) {

        let deleteByIDSchema:Joi.ObjectSchema = Joi.object({
            id : Joi.number().required()
        }).required();

        try {
            const value = await deleteByIDSchema.validateAsync(req.params);
            res.locals.id = value.id;
            next();
        } catch(error){
            res.status(StatusCodes.BAD_REQUEST).send(error.message);
            console.log(`${StatusCodes.BAD_REQUEST} - ${error.message}`);
        }
    }

}