import express from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

import { AuthRouter } from "../routes/auth.route";
import { UserRouter } from "../routes/user.route";
export default async ({ app }: { app: express.Application })=> {

    app.use(express.json())
    app.use(express.urlencoded({ extended : false}))

    app.get("/status", (req:express.Request, res:express.Response) => {
        res.status(StatusCodes.OK).json({"Status" : "OK"});
    });

    app.use("/auth", AuthRouter);
    app.use("/users", UserRouter);

};