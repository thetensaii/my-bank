import React from 'react'
import styles from '../../Form.module.css'
type InputProps = {
    name:string,
    label: string,
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input:React.FC<InputProps> = ({type = 'text', name, label, ...rest}) => {
  return (
    <div className={styles.formControl}>
        <label htmlFor={name} className={styles.label}>{label}</label>
        <input type={type} id={name} name={name} className={styles.inputText} {...rest}/>
    </div>
  )
}
