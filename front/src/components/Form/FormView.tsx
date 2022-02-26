import React from 'react'
import styles from './Form.module.css'

type FormViewProps = {
    onSubmit: (e:React.FormEvent<HTMLFormElement>) => void
}

export const FormView:React.FC<FormViewProps> = ({children, onSubmit}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
        {children}
    </form>
  )
}
