import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loadUserAccountsAction } from "redux/actions/accountActions";
import { accountsSelector } from "redux/selectors/accountSelectors";
import { AccountProps } from "utils/props/AccountProps";
import useToggle from "./useToggle";

const useLoadAccounts = (userID : number) : [boolean, AccountProps[]|null]=> {
    const [loading, toggleLoading] = useToggle(true);
    const accounts = useSelector(accountsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if(accounts) {
                toggleLoading();
                return;
            }

            await dispatch(loadUserAccountsAction(userID))
            toggleLoading();
        })();
    }, []);

    return [loading, accounts];
}

export default useLoadAccounts;