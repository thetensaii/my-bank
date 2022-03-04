import { Dispatch } from "redux";
import { AuthService } from "services/authService";
import { UserService } from "services/userService";
import { UserProps } from "utils/props/UserProps";

export enum UserActions {
    AUTO_AUTH = "USER_AUTO_AUTH",
    SIGNIN = "USER_SIGNIN",
    UPDATE = "USER_UPDATE",
    SIGNOUT = "USER_SIGNOUT"
}

export type UserActionsProps = {
    type : UserActions.AUTO_AUTH,
    payload : UserProps
} | {
    type : UserActions.SIGNIN,
    payload : UserProps
} | {
    type : UserActions.UPDATE,
    payload : UserProps
} | {
    type : UserActions.SIGNOUT
}


export const signInUserAction = (data : {login:string, password:string}) => async (dispatch: Dispatch) => {
    const user = await AuthService.signIn(data);

    dispatch({
        type : UserActions.SIGNIN,
        payload: user
    })
}

export const checkUserAuthAction = () => async (dispatch: Dispatch) => {
    try{
        const user:UserProps = await AuthService.checkAuth();

        dispatch({
            type: UserActions.AUTO_AUTH,
            payload : user
        });
    } catch(error){
    }
}
type updateUserProps = {
    login : string,
    lastname : string,
    firstname : string,
    email : string
}
export const updateUserAction = (id:number, user:updateUserProps) => async (dispatch : Dispatch) => {
    const updatedUser:UserProps = await UserService.updateUser(id, user)

    dispatch({
        type : UserActions.UPDATE,
        payload: updatedUser
    })
}

export const signOutUserAction = () => async (dispatch: Dispatch ) => {
    await AuthService.signOut();
    const action:UserActionsProps = {type : UserActions.SIGNOUT}

    dispatch(action)
}