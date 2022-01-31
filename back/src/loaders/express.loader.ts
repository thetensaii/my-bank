import express from "express";
import cookieParser from "cookie-parser";
import { ApiRouter } from "../routes/api.route";
import cors from "cors"
import config from "../config";
import path from "path"

export default async ({ app }: { app: express.Application }) => {
    
    if(config.NODE_ENV !== "production"){
        app.use(cors({
            origin: config.FRONTEND_HOST,
            credentials: true
        }));
    }

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
     
    app.use("/api", ApiRouter)
    
    if(config.NODE_ENV === "production"){
        app.use(express.static("client"));

        app.get('*', (req:express.Request, res:express.Response) => {
            res.sendFile(path.join(__dirname, '../../client', 'index.html'));
        });
    }
};