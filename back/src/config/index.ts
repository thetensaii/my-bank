let DB:any;
if(process.env.NODE_ENV === "test"){
    DB = {
        HOST : process.env.DB_HOST_TEST || "",
        USER : process.env.DB_USER_TEST || "",
        PASSWORD : process.env.DB_PASSWORD_TEST || "",
        NAME : process.env.DB_NAME_TEST || "",
    }
} else {
    DB = {
        HOST : process.env.DB_HOST || "",
        USER : process.env.DB_USER || "",
        PASSWORD : process.env.DB_PASSWORD || "",
        NAME : process.env.DB_NAME || "",
    }
}
export default {
    "DB" : DB,
    "SALT_ROUNDS" : process.env.SALT_ROUNDS || 0
}