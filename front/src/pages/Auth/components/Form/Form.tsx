import React from 'react'
import styles from "./Form.module.css"

type FormProps = {
    onSubmit: (e : React.FormEvent<HTMLFormElement>) => void
}

export const Form:React.FC<FormProps> = ({onSubmit, children}) => {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            {children}
        </form>
    )
}
