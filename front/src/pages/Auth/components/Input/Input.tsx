import React from 'react'
import styles from "./Input.module.css"
type InputProps = {
    type?: string,
    placeholder?: string
}

export const Input: React.FC<InputProps> = ({ type = "text", placeholder = "" }) => {
    return (
        <input type={type} placeholder={placeholder} className={styles.input}/>
    )
}
