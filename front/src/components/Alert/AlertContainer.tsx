import React from 'react'
import { AlertTypes, AlertView } from './AlertView'

type AlertContainerProps = {
    type ?: AlertTypes
}

export const AlertContainer: React.FC<AlertContainerProps> = ({ type, children }) => {
    return (
        <AlertView type={type}>
            {children}
        </AlertView>
    )
}
