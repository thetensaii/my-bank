import { apiBackRequest, ApiPaths } from "utils/api";
import { AccountProps } from "utils/props/AccountProps";

export class AccountService {

    static async getUserAccounts(userID:number) : Promise<AccountProps[]> {
        const {data : accountsResponse} : {data : AccountResponseProps[]} = await apiBackRequest(`${ApiPaths.USER_ACCOUNTS}/${userID}`);
        
        const accounts:AccountProps[] = accountsResponse.map(a  => ({
            ...a,
            created_at : new Date(a.created_at),
            updated_at : a.updated_at ? new Date(a.updated_at) : null
        }))  

        return accounts;
    }
    
    static async addAccount(data : {
        user_id : number,
        name : string,
        balance : number
    }) : Promise<AccountProps> {
        const { data:accountResponse }  : {data : AccountResponseProps} = await apiBackRequest(ApiPaths.ACCOUNTS, {
            method : 'POST',
            data : data
        })

        return convertAccountResponseToAccount(accountResponse);
    }
    
    static async updateAccount(accountID:number, data : {
        name:string
    }) : Promise<AccountProps> {
        const {data : accountResponse} : {data : AccountResponseProps} = await apiBackRequest(`${ApiPaths.ACCOUNTS}/${accountID}`, {
            method :  'PUT',
            data : data
        })

        return convertAccountResponseToAccount(accountResponse);
    }

    static async deleteAccount(accountID:number):Promise<boolean> {
        const response = await apiBackRequest(`${ApiPaths.ACCOUNTS}/${accountID}`, {
            method: 'DELETE'
        })

        return response.status === 200;
    }

}

type AccountResponseProps = {
    created_at : string,
    updated_at : string | null
} & AccountProps

const convertAccountResponseToAccount = (accountResponse : AccountResponseProps) : AccountProps=> {
    return {
        ...accountResponse,
        created_at : new Date(accountResponse.created_at),
        updated_at : accountResponse.updated_at ? new Date(accountResponse.updated_at) : null
    }
}  
