import { Router, Request, Response } from "express";
import { AuthValidator } from "../validators/auth.validator"; 
import { Container } from "typedi"
import { AuthService } from "../services/auth.service";
import { UserEntity } from "../entities/user.entity";
import { StatusCodes } from "http-status-codes";
import { createUserToken } from "../core/JWT";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { HttpError } from "../core/HttpError";
export const AuthRouter = Router();

AuthRouter.post("/signup", AuthValidator.signUp, async (req:Request, res:Response) => {
    let authService:AuthService = Container.get(AuthService);
    try {
        let userEntity:UserEntity = await authService.signUp(res.locals.user);
        let token:string = await createUserToken(userEntity);

        res.sendStatus(StatusCodes.CREATED);
    } catch ( error) {
        if(error instanceof HttpError) {
            console.log(`${error.httpCode} - ${error.message}`);
            res.status(error.httpCode).send({
                errors : [error.message]
            });
        } else if (error instanceof Error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            console.log(`${StatusCodes.INTERNAL_SERVER_ERROR} - ${error.message}`);
        }
    }
});

AuthRouter.post("/signin", AuthValidator.signIn, async (req:Request, res:Response) => {
    let authService:AuthService = Container.get(AuthService);
    try {
        let userEntity:UserEntity = await authService.signIn(res.locals.user.login, res.locals.user.password);
        let token:string = await createUserToken(userEntity);

        res.cookie("token", token, {httpOnly : true});
        res.status(StatusCodes.OK).json(userEntity.toPublicJSON());
    } catch (error) {
        if(error instanceof HttpError) {
            console.log(`${error.httpCode} - ${error.message}`);
            res.status(error.httpCode).send({
                errors : [error.message]
            });
        } else if (error instanceof Error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            console.log(`${StatusCodes.INTERNAL_SERVER_ERROR} - ${error.message}`);
        }
    }
});

AuthRouter.get("/me", AuthMiddleware.isAuth, async (req:Request, res:Response) => {
    try {
        res.status(StatusCodes.OK).json(res.locals.user);
    } catch (error) {
        if(error instanceof HttpError) {
            console.log(`${error.httpCode} - ${error.message}`);
            res.status(error.httpCode).send({
                errors : [error.message]
            });
        } else if (error instanceof Error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            console.log(`${StatusCodes.INTERNAL_SERVER_ERROR} - ${error.message}`);
        }
    }
});

AuthRouter.get("/disconnect", AuthMiddleware.isAuth, async (req:Request, res:Response) => {
    try {
        res.cookie("token", "", {maxAge : 1, httpOnly : true})
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        if(error instanceof HttpError) {
            console.log(`${error.httpCode} - ${error.message}`);
            res.status(error.httpCode).send({
                errors : [error.message]
            });
        } else if (error instanceof Error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            console.log(`${StatusCodes.INTERNAL_SERVER_ERROR} - ${error.message}`);
        }
    }
});
