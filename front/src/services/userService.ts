import { apiBackRequest, ApiPaths } from "utils/api";
import { UserProps } from "utils/props/UserProps";

export const updateUser = async (userID:number, data:Object) : Promise<UserProps> => {
    const response = await apiBackRequest(`${ApiPaths.USERS}/${userID}`, {
        method: "PUT",
        data: data
    })

    return response.data;
}


export const updateUserPassword = async (userID:number, data:Object) : Promise<boolean> => {
    const response = await apiBackRequest(`${ApiPaths.USER_PASSWORD}/${userID}`, {
        method: "PUT",
        data: data
    })

    return response.status === 200;
}