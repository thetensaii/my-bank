const config = {
    NODE_ENV : process.env.NODE_ENV || "development",
    // BACKEND_SERVER_URL : `http://localhost:${process.env.REACT_APP_BACK_PORT}`
    BACKEND_SERVER_URL : `http://localhost:8080/api`
    // BACKEND_SERVER_URL : `http://localhost:8080`
}

export {config as default};