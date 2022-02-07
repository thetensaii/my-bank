import { UserProps } from "utils/props/UserProps"
import { apiBackRequest } from "utils/api";
import { AxiosResponse } from "axios";
import { ApiPaths } from "utils/api";

export const checkAuth = async (): Promise<UserProps> => {
    const response: AxiosResponse = await apiBackRequest(ApiPaths.ME, {
        method: "GET"
    });
    return response.data
}

export const signIn = async (data: Object) => {
    const response: AxiosResponse = await apiBackRequest(ApiPaths.SIGNIN, {
        method: "POST",
        data: data
    })
    return response.data
}

export const signUp = async (data: Object) => {
    const response: AxiosResponse = await apiBackRequest(ApiPaths.SIGNUP, {
        method: "POST",
        data: data
    })
    
    return response.status === 201;
}