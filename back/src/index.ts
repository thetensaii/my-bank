import "reflect-metadata"
import express from "express";
import config from "./config"


const main = async () => {
    const app = express();

    await require('./loaders').default({ expressApp: app });

    app.listen(config.PORT, () => {
        console.log(`
        ################################################
        🛡️  Server listening on port: ${config.PORT} 🛡️
        ################################################
      `);
    })
}

main(); 