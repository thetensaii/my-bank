import "reflect-metadata"
import express from "express";


const main = async () => {
    const app = express();

    await require('./loaders').default({ expressApp: app });


}

main(); 