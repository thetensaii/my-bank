import React from 'react'
import styles from "./Button.module.css"

type ButtonProps = {
    ghost?: boolean,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<ButtonProps> = ({ ghost = false, onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.button} ${ghost ? styles.ghost : ""}`}
        >
            {children}
        </button>
    )
}
