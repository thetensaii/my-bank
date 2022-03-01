import React from 'react'
import Modal from 'components/Modal'
import Form from 'components/Form'
import Input from 'components/Form/components/Input'
import SubmitButton from 'components/Form/components/SubmitButton'
import { AlertTypes } from 'components/Alert/AlertView'
import Alert from 'components/Alert'

type AddAccountModalFormViewProps = {
    alert : {type : AlertTypes, message : string} | null,
    showModal : boolean,
    closeModal : () => void,
    closeAlert: () => void,
    onFormSubmit: (e:React.FormEvent<HTMLFormElement>) => void
}

export const AddAccountFormModalView:React.FC<AddAccountModalFormViewProps>= ({alert, showModal, closeModal, closeAlert, onFormSubmit}) => {
  return (
    <Modal title='Création de compte' showModal={showModal} closeModal={closeModal}>
        <Form onSubmit={onFormSubmit}>
            <Input 
                name='name'
                label='Nom'
                required
                />
            <Input 
                type='number'
                name='balance'
                label='Solde'
                step={0.01}
                required
                />
            <SubmitButton>Ajouter le compte</SubmitButton>
        </Form>
        {alert && <Alert type={alert.type} closeAlert={closeAlert}>{alert.message}</Alert>}
    </Modal>
  )
}
