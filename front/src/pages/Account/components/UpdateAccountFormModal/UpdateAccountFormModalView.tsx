import Alert from 'components/Alert'
import { AlertTypes } from 'components/Alert/AlertView'
import Form from 'components/Form'
import Input from 'components/Form/components/Input'
import SubmitButton from 'components/Form/components/SubmitButton'
import Modal from 'components/Modal'
import React from 'react'
import { AccountProps } from 'utils/props/AccountProps'


type UpdateAccountFormModalViewProps = {
    account: AccountProps,
    showModal : boolean,
    closeModal : () => void,
    alert: {type : AlertTypes, message : string} | null,
    closeAlert: () => void,
    onFormSubmit: (e:React.FormEvent<HTMLFormElement>) => void
}

export const UpdateAccountFormModalView:React.FC<UpdateAccountFormModalViewProps> = ({account, showModal, closeModal, alert, closeAlert, onFormSubmit}) => {
  return (
    <Modal title={`Modification du compte : ${account.name}`} showModal={showModal} closeModal={closeModal}>
        <Form onSubmit={onFormSubmit}>
            <Input 
                name='name'
                label='Nom'
                defaultValue={account.name}
                required
                />

            <div>Solde actuelle : {account.balance} €</div>
            <SubmitButton>Modifier le compte</SubmitButton>
        </Form>
        {alert && <Alert type={alert.type} closeAlert={closeAlert}>{alert.message}</Alert>}
    </Modal>
  )
}
