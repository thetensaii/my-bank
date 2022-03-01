import { AccountActions, AccountActionsProps } from "redux/actions/accountActions";
import { AccountProps } from "utils/props/AccountProps";

export const accountReducer = (state : AccountProps[] | null = null, action :AccountActionsProps) => {
    switch(action.type){
        case AccountActions.LOAD:
            return action.payload;
        case AccountActions.ADD:
            return state ? [...state, action.payload] : [action.payload];
        case AccountActions.UPDATE:
            return state?.map(account => (account.id === action.payload.id) ? action.payload : account);
        case AccountActions.DELETE:
            return state?.filter(account => account.id !== action.payload);
        default:
            console.error(`ACCOUNT_REDUCER : Type non valide`);
            return state
    }
}