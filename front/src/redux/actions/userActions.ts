import { UserProps } from "utils/props/UserProps";

export enum UserActions {
    SET = "USER_SET",
    UPDATE = "USER_UPDATE",
    UNSET = "USER_UNSET"
}

export type UserActionsProps = {
    type : UserActions.SET,
    payload : UserProps
} | {
    type : UserActions.UPDATE,
    payload : UserProps
} | {
    type : UserActions.UNSET
}

export const setUserAction = (user:UserProps) : UserActionsProps => ({
    type : UserActions.SET,
    payload: user
})

export const updateUserAction = (user:UserProps) : UserActionsProps => ({
    type : UserActions.UPDATE,
    payload: user
})

export const unsetUserAction = () : UserActionsProps => ({
    type : UserActions.UNSET
})