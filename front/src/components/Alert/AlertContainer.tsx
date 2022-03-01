import React from 'react'
import { AlertTypes, AlertView } from './AlertView'

type AlertContainerProps = {
    type ?: AlertTypes,
    closeAlert: () => void
}

export const AlertContainer: React.FC<AlertContainerProps> = ({ type, closeAlert, children }) => {
    return (
        <AlertView type={type} closeAlert={closeAlert}>
            {children}
        </AlertView>
    )
}
