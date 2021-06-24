import { Router, Request, Response } from "express";
import { AuthValidator } from "../validators/auth.validator"; 
import { Container } from "typedi"
import { AuthService } from "../services/auth.service";
import { UserEntity } from "../entities/user.entity";
import { StatusCodes } from "http-status-codes";
import { createUserToken } from "../core/JWT";
export const AuthRouter = Router();

AuthRouter.post("/signup", AuthValidator.signUp, async (req:Request, res:Response) => {
    let authService = Container.get(AuthService);
    try {
        let userEntity:UserEntity = await authService.signUp(res.locals.user);
        let token:string = await createUserToken(userEntity);
        res.status(StatusCodes.CREATED).json({token : token});
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});

AuthRouter.post("/signin", AuthValidator.signIn, async (req:Request, res:Response) => {
    let authService = Container.get(AuthService);
    try {
        let userEntity:UserEntity = await authService.signIn(res.locals.user.login, res.locals.user.password);
        let token:string = await createUserToken(userEntity);
        res.status(StatusCodes.OK).json({token : token});
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});
