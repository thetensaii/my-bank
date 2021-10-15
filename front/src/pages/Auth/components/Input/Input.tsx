import React from 'react'
import styles from "./Input.module.css"
type InputProps = {
    name:string,
    type?: string,
    placeholder?: string,
    required?: boolean
}

export const Input: React.FC<InputProps> = ({ name, type = "text", placeholder = "", required = false }) => {
    return (
        <input name={name} type={type} placeholder={placeholder} className={styles.input} required={required}/>
    )
}
