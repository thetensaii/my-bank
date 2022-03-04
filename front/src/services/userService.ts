import { apiBackRequest, ApiPaths } from "utils/api";
import { UserProps } from "utils/props/UserProps";


export class UserService {
    static async updateUser(userID:number, data:Object) : Promise<UserProps> {
        const response = await apiBackRequest(`${ApiPaths.USERS}/${userID}`, {
            method: "PUT",
            data: data
        })

        return response.data;
    }

    static async updateUserPassword(userID:number, data:Object) : Promise<boolean> {
        const response = await apiBackRequest(`${ApiPaths.USER_PASSWORD}/${userID}`, {
            method: "PUT",
            data: data
        })

        return response.status === 200;
    }
}