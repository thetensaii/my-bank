import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "config";

export const apiBackRequest = async (endpoint: string, options: AxiosRequestConfig = {}) => {
    const defaultOptions:AxiosRequestConfig = {
        withCredentials : true
    }

    const response:AxiosResponse = await axios(config.BACKEND_SERVER_URL + endpoint, {
        ...defaultOptions,
        ...options
    })
    return response;
}
