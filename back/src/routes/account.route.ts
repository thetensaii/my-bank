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
    let accountService:AccountService = Container.get(AccountService);
    let operationService:OperationService = Container.get(OperationService);

    let accountID:number = +req.params.id;
    try {
        let accountEntity:AccountEntity|null = await accountService.findByID(accountID);
        if(!accountEntity){
            throw new HttpError(StatusCodes.NOT_FOUND, "Account doesn't exist");
        }

        let operations:OperationEntity[] = await operationService.findByAccountID(accountID);
        let accountJSON:AccountJSON = accountEntity.toJSON();
        let operationsJSON:OperationJSON[] = operations.map(o => o.toJSON());

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
    let accountService:AccountService = Container.get(AccountService);

    let accountID:number = +req.params.id;
    try {
        let accounts:AccountEntity[] = await accountService.findByUserID(accountID);
        let accountsJSON:AccountJSON[] = accounts.map(a => a.toJSON()); 

        res.status(StatusCodes.OK).json(accountsJSON);
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});

AccountRouter.post("/", AccountValidator.create, async (req:Request, res:Response) => {
    let accountService:AccountService = Container.get(AccountService);
    try {
        let accountEntity:AccountEntity = await accountService.create(res.locals.user, res.locals.account);
        let accountJSON:AccountJSON = accountEntity.toJSON();
        
        res.status(StatusCodes.CREATED).json(accountJSON);
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});
 
AccountRouter.put("/:id", AccountValidator.changeName, async(req:Request, res:Response) => {
    let accountService:AccountService = Container.get(AccountService);
    try {
        await accountService.changeName(res.locals.user, res.locals.account.id, res.locals.account.name);
        res.sendStatus(StatusCodes.OK);
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});

AccountRouter.delete("/:id", AccountValidator.deleteByID, async (req:Request, res:Response) => {
    let accountService:AccountService = Container.get(AccountService);
    
    try {
        await accountService.delete(res.locals.user, res.locals.id);
        
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});