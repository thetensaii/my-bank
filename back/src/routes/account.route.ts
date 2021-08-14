import { Router, Request, Response } from "express";
import { Container } from "typedi"
import { StatusCodes } from "http-status-codes";
import { HttpError } from "../core/HttpError";
import { AccountValidator } from "../validators/account.validator";
import { AccountEntity, AccountJSON } from "../entities/account.entity";
import { AccountService } from "../services/account.service";
import { OperationEntity, OperationJSON } from "../entities/operation.entity";
import { OperationService } from "../services/operation.service";

export const AccountRouter = Router();

AccountRouter.get("/:id", AccountValidator.findByID, async (req:Request, res:Response) => {
    const accountService:AccountService = Container.get(AccountService);
    const operationService:OperationService = Container.get(OperationService);

    const accountID:number = +req.params.id;
    try {
        const accountEntity:AccountEntity|null = await accountService.findByID(accountID);
        if(!accountEntity){
            throw new HttpError(StatusCodes.NOT_FOUND, "Account doesn't exist");
        }

        const operations:OperationEntity[] = await operationService.findByAccountID(accountID);
        const accountJSON:AccountJSON = accountEntity.toJSON();
        const operationsJSON:OperationJSON[] = operations.map(o => o.toJSON());

        res.status(StatusCodes.OK).json({
            account : accountJSON,
            operations : operationsJSON
        });

    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});

AccountRouter.get("/user/:id", AccountValidator.findByID, async (req:Request, res:Response) => {
    const accountService:AccountService = Container.get(AccountService);

    const accountID:number = +req.params.id;
    try {
        const accounts:AccountEntity[] = await accountService.findByUserID(accountID);
        const accountsJSON:AccountJSON[] = accounts.map(a => a.toJSON()); 

        res.status(StatusCodes.OK).json(accountsJSON);
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});

AccountRouter.post("/", AccountValidator.create, async (req:Request, res:Response) => {
    const accountService:AccountService = Container.get(AccountService);
    try {
        const accountEntity:AccountEntity = await accountService.create(res.locals.user, res.locals.account);
        const accountJSON:AccountJSON = accountEntity.toJSON();
        
        res.status(StatusCodes.CREATED).json(accountJSON);
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});
 
AccountRouter.put("/:id", AccountValidator.changeName, async(req:Request, res:Response) => {
    const accountService:AccountService = Container.get(AccountService);
    try {
        const accountEntity:AccountEntity = await accountService.changeName(res.locals.user, res.locals.account.id, res.locals.account.name);
        res.status(StatusCodes.OK).send(accountEntity.toJSON());
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});

AccountRouter.delete("/:id", AccountValidator.deleteByID, async (req:Request, res:Response) => {
    const accountService:AccountService = Container.get(AccountService);
    
    try {
        await accountService.delete(res.locals.user, res.locals.id);
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});