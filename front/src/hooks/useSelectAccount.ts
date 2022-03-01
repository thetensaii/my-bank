import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { accountsSelector } from "redux/selectors/accountSelectors";
import { AccountProps } from "utils/props/AccountProps";

const useSelectAccount = () : [
    AccountProps | null,
    (accountID:number) => void,
    () => void
] => {
    const accounts = useSelector(accountsSelector);
    const [accountID, setAccountID] = useState<number|null>(null);
    const [account, setAccount] = useState<AccountProps|null>(null);

    useEffect(() => {
        if(accountID){
            setAccount(accounts?.find(a => a.id === accountID) || null)
        } else {
            setAccount(null);
        }

    }, [accountID, accounts])

    const selectAccountbyID = (accountID:number) => {
        setAccountID(accountID);
    }

    const unselectAccount = () => {
        setAccountID(null);
    }

    return [account, selectAccountbyID, unselectAccount]
}

export default useSelectAccount;