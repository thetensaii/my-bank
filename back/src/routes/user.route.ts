import { Router, Request, Response } from "express";
import { Container } from "typedi"
import { UserService } from "../services/user.service";
import { UserEntity } from "../entities/user.entity";
import { StatusCodes } from "http-status-codes";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserValidator } from "../validators/user.validator";
import { createUserToken } from "../core/JWT";
import { HttpError } from "../core/HttpError";


export const UserRouter = Router();



UserRouter.get("/:id", UserValidator.findByID, AuthMiddleware.isAuth, async (req:Request, res:Response) => {
    let userService = Container.get(UserService);
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

UserRouter.get("/", AuthMiddleware.isAuth, async (req:Request, res:Response) => {
    let userService = Container.get(UserService);
    try {
        let usersEntity:UserEntity[] = await userService.findAll();

        res.status(StatusCodes.OK).json(usersEntity.map(u => { return u.toPublicJSON() }));
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});

UserRouter.put("/:id",UserValidator.changeUser, AuthMiddleware.isAuth, async (req:Request, res:Response) => {
    let userService = Container.get(UserService);
    try {
        let userEntity:UserEntity = await userService.changeUser(res.locals.user, res.locals.changedUser);
        let token:string = await createUserToken(userEntity);

        res.status(StatusCodes.OK).json({token : token});
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});