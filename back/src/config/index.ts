import { DBConfig } from "../types/DBConfig";

let DB:DBConfig = process.env.NODE_ENV === "develop" ?
    {
        HOST : process.env.DB_HOST_TEST || "",
        USER : process.env.DB_USER_TEST || "",
        PASSWORD : process.env.DB_PASSWORD_TEST || "",
        NAME : process.env.DB_NAME_TEST || ""
    } :
    {
        HOST : process.env.DB_HOST || "",
        USER : process.env.DB_USER || "",
        PASSWORD : process.env.DB_PASSWORD || "",
        NAME : process.env.DB_NAME || ""
    }


export default {
    NODE_ENV : process.env.NODE_ENV || "development",

    FRONTEND_HOST : `http://localhost:${process.env.FRONT_PORT}` || "",

    // Server ports
    PORT: process.env.BACK_PORT || 8080,    
    
    // Database
    DB : DB,

    // Password
    PASSWORD_SALT: process.env.PASSWORD_SALT || "",
    SALT_ROUNDS : +(process.env.SALT_ROUNDS || 0),

    // JWT
    JWT_SECRET: process.env.JWT_SECRET || "",
    JWT_TOKEN_EXP_IN_MINUTES: +(process.env.JWT_TOKEN_EXP_IN_MINUTES || 0)
}