import { Router, Request, Response } from "express";
import { Container } from "typedi"
import { UserService } from "../services/user.service";
import { UserEntity } from "../entities/user.entity";
import { StatusCodes } from "http-status-codes";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserValidator } from "../validators/user.validator";


export const UserRouter = Router();

UserRouter.get("/:id", UserValidator.findByID, AuthMiddleware.isAuth, async (req:Request, res:Response) => {
    let userService = Container.get(UserService);
    try {
        let userEntity:UserEntity = await userService.findByID(+req.params.id);

        res.status(StatusCodes.OK).json(userEntity.toPublicJSON());
    } catch (error) {
        console.log(`${error.httpCode} - ${error.message}`)
        res.status(error.httpCode).send(error.message)
    }
});
