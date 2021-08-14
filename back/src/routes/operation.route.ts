import { Router, Request, Response } from "express";
import { Container } from "typedi"
import { StatusCodes } from "http-status-codes";
import { HttpError } from "../core/HttpError";
import { OperationEntity, OperationJSON } from "../entities/operation.entity";
import { OperationService } from "../services/operation.service";
import { OperationValidator } from "../validators/operation.validator";

export const OperationRouter = Router();


OperationRouter.get("/:id", OperationValidator.findByID, async (req:Request, res:Response) => {
    let operationService:OperationService = Container.get(OperationService);

    let operationID:number = res.locals.id;
    try {
        let operationEntity:OperationEntity|null = await operationService.findByID(operationID);
        if(!operationEntity){
            throw new HttpError(StatusCodes.NOT_FOUND, "Operation doesn't exist");
        }

        let operationJSON:OperationJSON = operationEntity.toJSON();

        res.status(StatusCodes.OK).json(operationJSON);
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});

OperationRouter.get("/account/:id", OperationValidator.findByAccountID, async (req:Request, res:Response) => {
    let operationService:OperationService = Container.get(OperationService);

    let accountID:number = res.locals.accountID;
    try {
        let operations:OperationEntity[] = await operationService.findByAccountID(accountID);
        let operationsJSON:OperationJSON[] = operations.map(o => o.toJSON());

        res.status(StatusCodes.OK).json(operationsJSON);
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});

OperationRouter.post("/", OperationValidator.create, async (req:Request, res:Response) => {
    let operationService:OperationService = Container.get(OperationService);

    try {
        let operationEntity:OperationEntity = await operationService.create(res.locals.user, res.locals.operation);
        let operationJSON:OperationJSON = operationEntity.toJSON();
        
        res.status(StatusCodes.CREATED).json(operationJSON);
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});

OperationRouter.delete("/:id", OperationValidator.deleteByID, async (req:Request, res:Response) => {
    let operationService:OperationService = Container.get(OperationService);

    try {
        await operationService.delete(res.locals.user, res.locals.id);
        
        res.sendStatus(StatusCodes.OK);
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});