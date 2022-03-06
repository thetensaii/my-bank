import Alert from 'components/Alert'
import { AlertTypes } from 'components/Alert/AlertView'
import Form from 'components/Form'
import Input from 'components/Form/components/Input'
import Select from 'components/Form/components/Select'
import SubmitButton from 'components/Form/components/SubmitButton'
import TextArea from 'components/Form/components/TextArea'
import Modal from 'components/Modal'
import React from 'react'
import { AccountProps } from 'utils/props/AccountProps'


type CreateTransactionFormModalViewProps = {
	onFormSubmit: (e:React.FormEvent<HTMLFormElement>) => void,

	showModal:boolean,
	closeModal: () => void,

	alert : {type : AlertTypes, message : string} | null,
	closeAlert : () => void,

	accounts : AccountProps[]
}

export const CreateTransactionFormModalView:React.FC<CreateTransactionFormModalViewProps> = ({accounts, onFormSubmit, showModal, closeModal, alert, closeAlert}) => {


  return (
    <Modal title='Création de transaction' showModal={showModal} closeModal={closeModal}>
      <Form onSubmit={onFormSubmit}>
			<Select
				name='account_id'
				label='Compte'
				options={accounts.map(account => ({value : account.id, label : account.name }))}
			/>
			<Input 
				type='number'
				name='amount'
				label='Montant'
				step={0.01}
				required
				/>
			<TextArea 
				name='comment'
				label='Commentaire'
				cols={27}
				rows={3}
				required
			/>
			
          <SubmitButton>Ajouter le compte</SubmitButton>
      </Form>
      {alert && <Alert type={alert.type} closeAlert={closeAlert}>{alert.message}</Alert>}
    </Modal>
  )
}
