import React from 'react'
import { AuthView } from './AuthView';


export const AuthContainer: React.FC = () => {

    const handleSignUpFormSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        console.log("sign UP")
    }

    const handleSignInFormSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        console.log("sign In")
    }

    return (
        <AuthView
            onSignUpFormSubmit={handleSignUpFormSubmit}
            onSignInFormSubmit={handleSignInFormSubmit}
        />
    )
}
