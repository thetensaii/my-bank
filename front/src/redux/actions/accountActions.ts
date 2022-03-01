import { Dispatch } from "redux";
import { addAccount, deleteAccount, getUserAccounts, updateAccount } from "services/accountService";
import { AccountProps } from "utils/props/AccountProps";


export enum AccountActions {
    LOAD = 'ACCOUNTS_LOAD',
    ADD = 'ACCOUNT_ADD',
    UPDATE = 'ACCOUNT_UPDATE',
    DELETE = 'ACCOUNT_DELETE'

}

export type AccountActionsProps = {
    type : AccountActions.LOAD,
    payload : AccountProps[]
} | {
    type : AccountActions.ADD,
    payload : AccountProps
} | {
    type : AccountActions.UPDATE,
    payload : AccountProps
} | {
    type : AccountActions.DELETE,
    payload : number
}

export const loadUserAccountsAction = (userID:number) => async (dispatch : Dispatch) => {
    const accounts = await getUserAccounts(userID);

    dispatch({
        type : AccountActions.LOAD,
        payload : accounts
    })
}

export const addAccountAction = (data : {
    user_id : number,
    name : string,
    balance : string
}) => async (dispatch : Dispatch) => {
    const account = await addAccount(data);

    dispatch({
        type : AccountActions.ADD,
        payload : account
    })
}

export const updateAccountAction = (accountID:number , data : {name :string}) => async (dispatch : Dispatch) => {
    const account = await updateAccount(accountID, data);

    dispatch({
        type : AccountActions.UPDATE,
        payload : account
    })
}

export const deleteAccountAction = (accountID:number) => async (dispatch : Dispatch) => {
    await deleteAccount(accountID);

    dispatch({
        type: AccountActions.DELETE,
        payload : accountID
    })
}