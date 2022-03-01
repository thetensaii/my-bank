import { apiBackRequest, ApiPaths } from "utils/api";
import { AccountProps } from "utils/props/AccountProps";


export const getUserAccounts = async (userID:number) : Promise<AccountProps[]> => {
    const response  = await apiBackRequest(`${ApiPaths.USER_ACCOUNTS}/${userID}`);

    return response.data;
}

export const addAccount = async (data : {
    user_id : number,
    name : string,
    balance : string
}) => {
    const response = await apiBackRequest(ApiPaths.ACCOUNTS, {
        method : 'POST',
        data : data
    })

    return response.data;
}

export const updateAccount = async (accountID:number, data : {
    name:string
}) => {
    const response = await apiBackRequest(`${ApiPaths.ACCOUNTS}/${accountID}`, {
        method :  'PUT',
        data : data
    })

    return response.data
}

export const deleteAccount = async (accountID:number) => {
    const response = await apiBackRequest(`${ApiPaths.ACCOUNTS}/${accountID}`, {
        method: 'DELETE'
    })

    return response.status === 200;
}