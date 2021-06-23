import { Router, Request, Response } from "express";
import { AuthValidator } from "../validators/auth.validator"; 
import { Container } from "typedi"
import { AuthService } from "../services/auth.service";
import { UserEntity } from "../entities/user.entity";
import { StatusCodes } from "http-status-codes";
export const AuthRouter = Router();

AuthRouter.post("/signup", AuthValidator.signUp, async (req:Request, res:Response) => {
    let authService = Container.get(AuthService);
    try {
        let userEntity:UserEntity = await authService.signUp(res.locals.user);
        res.status(StatusCodes.CREATED).send(userEntity.toPublicJSON());
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
    }
});
