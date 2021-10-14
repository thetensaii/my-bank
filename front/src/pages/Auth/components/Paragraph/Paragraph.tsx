import React from 'react'
import styles from "./Paragraph.module.css"
export const Paragraph:React.FC = ({children}) => {
    return (
        <p className={styles.paragraph}>
            {children}
        </p>
    )
}
