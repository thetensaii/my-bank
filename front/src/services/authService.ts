import { UserProps } from "utils/props/UserProps"
import { apiBackRequest } from "utils/api";
import { AxiosResponse } from "axios";
import { ApiPaths } from "utils/api";
import Cookies from "universal-cookie";
import config from "config";

export class AuthService {
    static async checkAuth(): Promise<UserProps> {
        const response: AxiosResponse = await apiBackRequest(ApiPaths.ME, {
            method: "GET"
        });
        return response.data
    }  
    static async signIn(data: {login:string, password:string}) {
        const response: AxiosResponse = await apiBackRequest(ApiPaths.SIGNIN, {
            method: "POST",
            data: data
        })
        return response.data
    }

    static async signUp(data: Object) {
        const response: AxiosResponse = await apiBackRequest(ApiPaths.SIGNUP, {
            method: "POST",
            data: data
        })
        
        return response.status === 201;
    }
    static async signOut(){
        const cookies = new Cookies();
        cookies.remove(config.AUTH_TOKEN);

        const response:AxiosResponse = await apiBackRequest(ApiPaths.DISCONNECT)

        return response.status === 200;
    }
}