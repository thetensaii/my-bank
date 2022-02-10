import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import { signIn, signUp } from 'services/authService';
import { AuthView } from './AuthView';
import { useDispatch } from 'react-redux';
import { setUserAction } from 'redux/actions/userActions';
import { PATHS } from 'routes/constants';
import axios from 'axios';
import { getFormData } from 'utils/functions';


export const AuthContainer: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [isSignUpFormActive, setIsSignUpFormActive] = useState<boolean>(location.pathname.toLowerCase().includes(PATHS.SIGNUP.toLowerCase()))
    const [success, setSuccess] = useState<string | null>(null)
    const [errors, setErrors] = useState<string[]>([])
    const defaultErrorMessage = "Une erreur a été rencontrée.";

    const handleSignUpFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const signUpForm: HTMLFormElement = e.currentTarget;
        const signUpData = getFormData(signUpForm);

        try {
            const isCreated = await signUp(signUpData);
            if (isCreated) {
                const pseudo = signUpForm.login.value;
                setSuccess(`L'utilisateur "${pseudo}" a été créé !`);
                setErrors([]);

                signUpForm.reset();

                setIsSignUpFormActive(false);
            }
        } catch (error) {
            setSuccess(null)

            signUpForm.password.value = "";
            signUpForm.login.focus();

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.log(error.response.data)
                    setErrors([...error.response.data.errors]);
                } else {
                    setErrors([defaultErrorMessage]);
                }
            } else if (error instanceof Error) {
                console.log(error.message);
                setErrors([defaultErrorMessage]);
            }
        }
    }

    const handleSignInFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const signInForm: HTMLFormElement = e.currentTarget;
        const signInData = getFormData(signInForm)

        try {
            const user = await signIn(signInData);
            dispatch(setUserAction(user))

            history.push("/");
        } catch (error) {
            setSuccess(null)
            signInForm.password.value = "";
            signInForm.login.focus();

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setErrors([...error.response.data.errors]);
                } else {
                    setErrors([defaultErrorMessage]);
                }
            } else if (error instanceof Error) {
                console.log(error.message);
                setErrors([defaultErrorMessage]);
            }
        }
    }

    return (
        <AuthView
            onSignUpFormSubmit={handleSignUpFormSubmit}
            onSignInFormSubmit={handleSignInFormSubmit}
            onSignInPanelClick={() => setIsSignUpFormActive(false)}
            onSignUpPanelClick={() => setIsSignUpFormActive(true)}
            isSignUpFormActive={isSignUpFormActive}
            errors={errors}
            success={success}
        />
    )
}
