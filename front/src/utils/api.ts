import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "config";

export const apiBackRequest = async (endpoint: string, options: AxiosRequestConfig = {}) => {
    const defaultOptions:AxiosRequestConfig = {
        withCredentials : true
    }

    const response:AxiosResponse = await axios(config.REACT_APP_BACKEND_DEVELOPMENT_URL + endpoint, {
        ...defaultOptions,
        ...options
    })
    return response;
}
