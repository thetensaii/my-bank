import { Router, Request, Response } from "express";
import { Container } from "typedi"
import { UserService } from "../services/user.service";
import { UserEntity } from "../entities/user.entity";
import { StatusCodes } from "http-status-codes";
import { UserValidator } from "../validators/user.validator";
import { createUserToken } from "../core/JWT";
import { HttpError } from "../core/HttpError";


export const UserRouter = Router();



UserRouter.get("/:id", UserValidator.findByID, async (req:Request, res:Response) => {
    let userService:UserService = Container.get(UserService);
    try {
        let userEntity:UserEntity|null = await userService.findByID(+req.params.id);
        
        if(!userEntity){
            throw new HttpError(StatusCodes.NOT_FOUND, "User doesn't exist");
        }

        res.status(StatusCodes.OK).json(userEntity.toPublicJSON());
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});

UserRouter.get("/", async (req:Request, res:Response) => {
    let userService:UserService = Container.get(UserService);
    try {
        let usersEntity:UserEntity[] = await userService.findAll();

        res.status(StatusCodes.OK).json(usersEntity.map(u => { return u.toPublicJSON() }));
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});

UserRouter.put("/:id",UserValidator.changeUser, async (req:Request, res:Response) => {
    let userService:UserService = Container.get(UserService);
    try {
        let userEntity:UserEntity = await userService.changeUser(res.locals.user, res.locals.changedUser);
        let token:string = await createUserToken(userEntity);

        if(res.locals.user.id == res.locals.changedUser.id){
            res.cookie("token", token, {httpOnly : true});
        }

        res.status(StatusCodes.OK).send(userEntity.toPublicJSON());
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});

UserRouter.put("/password/:id",UserValidator.changePassword, async (req:Request, res:Response) => {
    let userService:UserService = Container.get(UserService);
    try {
        await userService.changePassword(res.locals.user, res.locals.id, res.locals.password);

        res.sendStatus(StatusCodes.OK);
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});

UserRouter.delete("/:id", UserValidator.deleteByID, async (req:Request, res:Response) => {
    let userService:UserService = Container.get(UserService);
    try {
        await userService.delete(res.locals.user, +req.params.id);
        
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});