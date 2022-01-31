import React from 'react'
import Button from './components/Button'
import Form from './components/Form'
import Input from './components/Input'

import styles from "./Auth.module.css"
import Paragraph from './components/Paragraph'
import Alert from 'components/Alert'
import { AlertTypes } from 'components/Alert/AlertView'
export type AuthViewProps = {
    onSignUpFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    onSignInFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    onSignInPanelClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    onSignUpPanelClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    isSignUpFormActive: boolean,
    errors: string[],
    success?: string|null
}

export const AuthView: React.FC<AuthViewProps> = ({
    onSignInFormSubmit,
    onSignUpFormSubmit,
    onSignInPanelClick,
    onSignUpPanelClick,
    isSignUpFormActive,
    errors,
    success }) => {

    return (
        <div className={styles.body}>
            {success && <Alert type={AlertTypes.success}>{success}</Alert>}
            {
                errors.length > 0 &&
                <Alert type={AlertTypes.danger}>
                    <ul className={styles.errorList}>
                        {errors.map((e, idx) => <li key={idx}>
                            {e}
                        </li>
                        )}
                    </ul>
                </Alert>
            }
            <h2 className={styles.title}>Ma banque</h2>
            <div className={`${styles.container} ${(isSignUpFormActive ? styles.signUpFormActive : "")}`}>
                <div className={`${styles.formContainer} ${styles.signUpContainer} `}>
                    <Form onSubmit={onSignUpFormSubmit}>
                        <h1 className={styles.h1}>Créer un compte</h1>
                        <Input type="text" name="login" placeholder="Pseudo" required />
                        <Input type="text" name="lastname" placeholder="Nom" required />
                        <Input type="text" name="firstname" placeholder="Prénom" required />
                        <Input type="email" name="email" placeholder="Email" required />
                        <Input type="password" name="password" placeholder="Password" required />
                        <Button>S'enregistrer</Button>
                    </Form>
                </div>
                <div className={`${styles.formContainer} ${styles.signInContainer}`}>
                    <Form onSubmit={onSignInFormSubmit}>
                        <h1 className={styles.h1}>Se connecter</h1>
                        <Input type="text" name="login" placeholder="Pseudo" required />
                        <Input type="password" name="password" placeholder="Password" required />
                        <Button>Se connecter</Button>
                    </Form>
                </div>
                <div className={styles.overlayContainer} >
                    <div className={styles.overlay}>
                        <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                            <h1>Re !</h1>
                            <Paragraph >Connectez-vous afin d'accéder à vos comptes</Paragraph>
                            <Button ghost onClick={onSignInPanelClick}>Se connecter</Button>
                        </div>
                        <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                            <h1>Bienvenue !</h1>
                            <Paragraph>Inscrivez-vous afin de créer et gérer l'ensemble de vos comptes</Paragraph>
                            <Button ghost onClick={onSignUpPanelClick}>S'enregistrer</Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


