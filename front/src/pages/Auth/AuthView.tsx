import React, { useState } from 'react'
import Button from './components/Button'
import Form from './components/Form'
import Input from './components/Input'

import styles from "./Auth.module.css"
import Paragraph from './components/Paragraph'
export type AuthViewProps = {
    onSignUpFormSubmit : (e:React.FormEvent<HTMLFormElement>) => void,
    onSignInFormSubmit : (e:React.FormEvent<HTMLFormElement>) => void
}

export const AuthView: React.FC<AuthViewProps> = ({ onSignInFormSubmit, onSignUpFormSubmit }) => {

    const [signUpFormActive, setSignUpFormActive] = useState<boolean>(false)

    return (
        <div className={styles.body}>
            <h2 className={styles.title}>Ma banque</h2>
            <div className={`${styles.container} ${(signUpFormActive ? styles.signUpFormActive : "")}`}>
                <div className={`${styles.formContainer} ${styles.signUpContainer} `}>
                    <Form onSubmit={onSignUpFormSubmit}>
                        <h1 className={styles.h1}>Créer un compte</h1>
                        <Input type="text" placeholder="Pseudo" />
                        <Input type="text" placeholder="Nom" />
                        <Input type="text" placeholder="Prénom" />
                        <Input type="email" placeholder="Email" />
                        <Input type="password" placeholder="Password" />
                        <Button>S'enregistrer</Button>
                    </Form>
                </div>
                <div className={`${styles.formContainer} ${styles.signInContainer}`}>
                    <Form onSubmit={onSignInFormSubmit}>
                        <h1 className={styles.h1}>Se connecter</h1>
                        <Input type="email" placeholder="Email" />
                        <Input type="password" placeholder="Password" />
                        <Button>Se connecter</Button>
                    </Form>
                </div>
                <div className={styles.overlayContainer} >
                    <div className={styles.overlay}>
                        <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                            <h1>Re !</h1>
                            <Paragraph >Connectez-vous afin d'accéder à vos comptes</Paragraph>
                            <Button ghost onClick={e => {e.preventDefault(); setSignUpFormActive(false)}}>Se connecter</Button>
                        </div>
                        <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                            <h1>Bienvenue !</h1>
                            <Paragraph>Inscrivez-vous et créer/gérer l'ensemble de vos comptes</Paragraph>
                            <Button ghost onClick={e => {e.preventDefault(); setSignUpFormActive(true)}}>S'enregistrer</Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
