import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import { AuthService } from 'services/authService';
import { AuthView } from './AuthView';
import { useDispatch } from 'react-redux';
import { signInUserAction } from 'redux/actions/userActions';
import { PATHS } from 'routes/constants';
import axios from 'axios';
import { getFormData } from 'utils/functions';


export const AuthContainer: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [isSignUpFormActive, setIsSignUpFormActive] = useState<boolean>(location.pathname.toLowerCase().includes(PATHS.SIGNUP.toLowerCase()));
    const [success, setSuccess] = useState<string | null>(null);
    const [errors, setErrors] = useState<string[] | null>(null);
    const defaultErrorMessage = "Une erreur a été rencontrée.";


    const resetErrors = () => {
        setErrors(null);
    }

    const resetSuccess = () => {
        setSuccess(null);
    }

    const handleSignUpFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        resetSuccess();
        resetErrors();

        const signUpForm: HTMLFormElement = e.currentTarget;
        const signUpDataRaw = getFormData(signUpForm);
        const signUpData = {
            login : signUpDataRaw.login as string,
            lastname : signUpDataRaw.lastname as string,
            firstname : signUpDataRaw.firstname as string,
            email : signUpDataRaw.email as string,
            password : signUpDataRaw.password as string
        }

        try {
            const isCreated = await AuthService.signUp(signUpData);
            if (isCreated) {
                const pseudo = signUpForm.login.value;
                setSuccess(`L'utilisateur "${pseudo}" a été créé !`);

                signUpForm.reset();

                setIsSignUpFormActive(false);
            }
        } catch (error) {

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
        resetSuccess();
        resetErrors();

        const signInForm: HTMLFormElement = e.currentTarget;
        const signInDataRaw = getFormData(signInForm)
        const signInData = {
            login : signInDataRaw.login as string,
            password : signInDataRaw.password as string
        }

        try {
            await dispatch(signInUserAction(signInData));
            history.push("/");
        } catch (error) {
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
            closeErrorsAlert={resetErrors}
            success={success}
            closeSuccessAlert={resetSuccess}
        />
    )
}
