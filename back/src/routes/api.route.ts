import { Router, Request, Response } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AccountRouter } from "./account.route";
import { AuthRouter } from "./auth.route";
import { OperationRouter } from "./operation.route";
import { UserRouter } from "./user.route";
import { StatusCodes } from "http-status-codes";


export const ApiRouter = Router();

ApiRouter.get("/status", (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ "Status": "OK" });
});

ApiRouter.use("/auth", AuthRouter);
    
ApiRouter.use("/", AuthMiddleware.isAuth)
ApiRouter.use("/users", UserRouter);
ApiRouter.use("/accounts", AccountRouter);
ApiRouter.use("/operations", OperationRouter); 