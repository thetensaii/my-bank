import { UserActions, UserActionsProps } from "redux/actions/userActions";
import { UserProps } from "utils/props/UserProps";

export const userReducer = (state: UserProps | null = null, action: UserActionsProps): UserProps|null => {
    switch (action.type) {
        case UserActions.SET:
            return action.payload;
        case UserActions.UPDATE:
            return action.payload
        case UserActions.UNSET:
            return null;
        default:
            console.error(`USER_REDUCER : Type non valide`);
            return state;
    }
}