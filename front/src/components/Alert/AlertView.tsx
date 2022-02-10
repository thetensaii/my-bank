import React from 'react'
import { createPortal } from 'react-dom'
import styles from "./Alert.module.css"
export enum AlertTypes {
    danger = "Danger",
    info = "Info",
    success = "Success"
}
type AlertViewProps = {
    type?: AlertTypes
}

export const AlertView: React.FC<AlertViewProps> = ({ type = AlertTypes.info, children }) => {

    return createPortal(
        <div className={`${styles.alert} ${styles[`alert${type}`]}`}>
            {children}
        </div>,
        document.getElementById("alert") as Element
    )
}
