const config = {
    NODE_ENV : process.env.NODE_ENV || "development",
    REACT_APP_BACKEND_DEVELOPMENT_URL : process.env.REACT_APP_BACKEND_DEVELOPMENT_URL || "http://localhost:8080",
}

export {config as default};