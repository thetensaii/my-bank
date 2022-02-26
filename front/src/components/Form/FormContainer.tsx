import React from 'react'
import { FormView } from './FormView'

type FormContainerProps = {
    onSubmit: (e:React.FormEvent<HTMLFormElement>) => void
}

export const FormContainer:React.FC<FormContainerProps> = ({children, onSubmit}) => {
  return (
    <FormView onSubmit={onSubmit}>
        {children}
    </FormView>
  )
}
