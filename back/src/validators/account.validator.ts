import Joi from "joi";
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AccountJSON } from "../entities/account.entity";

export class AccountValidator {
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

    static async findByUserID(req:Request, res:Response, next:NextFunction) {

        let findByUserIDSchema:Joi.ObjectSchema = Joi.object({
            id : Joi.number().required()
        }).required();

        try {
            const value = await findByUserIDSchema.validateAsync(req.params);
            next();
        } catch(error){
            res.status(StatusCodes.BAD_REQUEST).send(error.message);
            console.log(`${StatusCodes.BAD_REQUEST} - ${error.message}`);
        }
    }

    static async create(req:Request, res:Response, next:NextFunction) {

        let createSchema:Joi.ObjectSchema = Joi.object({
            user_id : Joi.number().required(),
            name : Joi.string().required(),
            balance : Joi.number().precision(2).required()
        }).required();

        try {
            const value:AccountJSON = await createSchema.validateAsync(req.body);
            res.locals.account = value;
            next();
        } catch(error){
            res.status(StatusCodes.BAD_REQUEST).send(error.message);
            console.log(`${StatusCodes.BAD_REQUEST} - ${error.message}`);
        }
    }

    static async changeName(req:Request, res:Response, next:NextFunction) {

        let changeNameSchema:Joi.ObjectSchema = Joi.object({
            name : Joi.string().required()
        }).required();

        let IDSchema:Joi.ObjectSchema = Joi.object({
            id : Joi.number().required()
        }).required();

        try {
            let value = await changeNameSchema.validateAsync(req.body);
            res.locals.account = {};
            res.locals.account.name = value.name;

            value = await IDSchema.validateAsync(req.params);
            res.locals.account.id = value.id;

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