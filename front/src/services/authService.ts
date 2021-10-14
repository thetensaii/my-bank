import { UserProps } from "utils/props/UserProps"
import { apiBackRequest } from "utils/api";
import { AxiosResponse } from "axios";

export const checkAuth = async () : Promise<UserProps> => {
    const response:AxiosResponse = await apiBackRequest("/auth/me",{
        method : "GET"
    });
    return response.data as UserProps
}