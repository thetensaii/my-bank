import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { userSelector } from "redux/selectors/userSelectors"
import { AccountService } from "services/accountService"
import { AccountProps } from "utils/props/AccountProps"
import useToggle from "./useToggle"

export const useAccounts = () :{
    loadingAccounts : boolean, 
    accounts : AccountProps[], 
    account: AccountProps|null,
    fetchAccounts : () => Promise<void>,
    addAccount : (data : {
        user_id : number,
        name : string,
        balance : number
    }) => Promise<void>,
    updateAccount: (data : {name : string}) => Promise<void>,
    deleteAccount: () => Promise<void>,
    selectAccountByID : (accountID:number) => void,
    deselectAccount: () => void

    }=> {
    const [accounts, setAccounts] = useState<AccountProps[]>([])
    const [loadingAccounts, toggleLoading] = useToggle(false);
    const user = useSelector(userSelector);

    const [accountID, setAccountID] = useState<number|null>(null);
    const [account, setAccount] = useState<AccountProps|null>(null);

    const fetchAccounts = useCallback(async () => {
        toggleLoading();
        try{
            if(user){
                const newAccounts = await AccountService.getUserAccounts(user.id);
                setAccounts(newAccounts.reverse());
                toggleLoading();
            }
        }catch(error){
            toggleLoading();
            console.log(error)
			// TODO : Manage Alert with redux store
        }
    }, [user, toggleLoading])
    
    useEffect(() => { // Set acccounts on component did mount
        (async() => {
            await fetchAccounts();
        })()
    }, [fetchAccounts])

    useEffect(() => { // Set the selected Account
        if(accountID){
            setAccount(accounts?.find(a => a.id === accountID) || null)
        } else {
            setAccount(null);
        }

    }, [accountID, accounts])

    const selectAccountByID = (accountID:number) => {
        setAccountID(accountID);
    }

    const deselectAccount = () => {
        setAccountID(null);
    }

    const addAccount = async (data : {
        user_id : number,
        name : string,
        balance : number
    }) => {
        const newAccount = await AccountService.addAccount(data);
        setAccounts(accounts =>  [newAccount, ...accounts])
    }

    const updateAccount = async (data : {name : string}) => {
        if(accountID){
            const updatedAccount = await AccountService.updateAccount(accountID, data);
            setAccounts(accounts => accounts.map(account => (account.id === accountID) ? updatedAccount : account));
        } else {
            // Alert pas de compte selectionné
        }
    }
    
    const deleteAccount = async () => {
        if(accountID) {
            await AccountService.deleteAccount(accountID)
            setAccounts(accounts => accounts.filter(account => account.id !== accountID));
            setAccountID(null);
        } else {
            // Alert pas de compte selectionné
        }
    }

    return {
        loadingAccounts : loadingAccounts, 
        accounts : accounts,
        account : account,
        fetchAccounts: fetchAccounts,
        addAccount: addAccount,
        updateAccount : updateAccount,
        deleteAccount : deleteAccount,
        selectAccountByID: selectAccountByID,
        deselectAccount: deselectAccount
    }
}
