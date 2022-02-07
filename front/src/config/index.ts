const config = {
    NODE_ENV : process.env.NODE_ENV || "development",
    // BACKEND_SERVER_URL : `http://localhost:${process.env.REACT_APP_BACK_PORT}`
    BACKEND_SERVER_URL : `http://localhost:8080/api`,
    AUTH_TOKEN : 'token'
}

export {config as default};