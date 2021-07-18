import express from "express";
import { StatusCodes } from "http-status-codes";
import cookieParser from "cookie-parser";

import { AuthRouter } from "../routes/auth.route";
import { UserRouter } from "../routes/user.route";
import { AccountRouter } from "../routes/account.route";
export default async ({ app }: { app: express.Application })=> {

    app.use(express.json());
    app.use(express.urlencoded({ extended : false}));
    app.use(cookieParser());

    app.get("/status", (req:express.Request, res:express.Response) => {
        res.status(StatusCodes.OK).json({"Status" : "OK"});
    });

    app.use("/auth", AuthRouter);
    app.use("/users", UserRouter);
    app.use("/accounts", AccountRouter);

};