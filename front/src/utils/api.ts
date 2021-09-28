import axios, { AxiosRequestConfig } from "axios";

export const apiBack = async (endpoint: string, options: AxiosRequestConfig = {}) => {
    const response = await axios(process.env.REACT_APP_BACK_URL + endpoint, options)
    return response.data;
}