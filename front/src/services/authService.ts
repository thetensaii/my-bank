import { UserProps } from "utils/props/UserProps"
import { apiBackRequest } from "utils/api";
import { AxiosResponse } from "axios";

export const checkAuth = async (): Promise<UserProps> => {
    const response: AxiosResponse = await apiBackRequest("/auth/me", {
        method: "GET"
    });
    return response.data
}

export const signIn = async (data: Object) => {
    const response: AxiosResponse = await apiBackRequest("/auth/signin", {
        method: "POST",
        data: data
    })
    return response.data
}

export const signUp = async (data: Object) => {
    const response: AxiosResponse = await apiBackRequest("/auth/signup", {
        method: "POST",
        data: data
    })
    
    return response.status === 201;
}