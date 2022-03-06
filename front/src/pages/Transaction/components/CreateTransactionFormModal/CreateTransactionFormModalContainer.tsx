import React from 'react'
import { useAlert } from 'hooks/useAlert'
import { CreateTransactionFormModalView } from './CreateTransactionFormModalView'
import { getFormData } from 'utils/functions'
import { AccountProps } from 'utils/props/AccountProps'
import { AlertTypes } from 'components/Alert/AlertView'
import axios from 'axios'

type CreateTransactionFormModalContainerProps = {
	accounts : AccountProps[],
	addTransactionFunction : (data : {
		account_id : number,
		amount : number,
		comment : string
	}) => Promise<void>,
	showModal : boolean,
	closeModal : () => void,
	onAddTransactionSuccess: () => void
}

export const CreateTransactionFormModalContainer:React.FC<CreateTransactionFormModalContainerProps> = ({accounts, addTransactionFunction, showModal, closeModal, onAddTransactionSuccess}) => {
	const [alert, updateAlert, removeAlert] = useAlert();

	const onFormSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		removeAlert();

		const addTransactionForm = e.currentTarget;
		const addTransactionFormDataRaw = getFormData(addTransactionForm);
		const addTransactionData = {
			account_id : Number(addTransactionFormDataRaw.account_id) as number,
			amount : Number(addTransactionFormDataRaw.amount) as number,
			comment : addTransactionFormDataRaw.comment as string
		}

		try{
			await addTransactionFunction(addTransactionData)
			onAddTransactionSuccess();
		} catch (error){
			if (axios.isAxiosError(error) && error.response) {
				console.error(error.response.data)
				updateAlert(AlertTypes.danger, error.response.data)
			} else if (error instanceof Error) {
				console.error(error.message);
				updateAlert(AlertTypes.danger, 'Une erreur a été rencontrée.')
			}
		}
	}

	const onCloseModal = () => {
		closeModal();
		removeAlert();
	}
    
    return (
		<CreateTransactionFormModalView
			accounts={accounts}

			onFormSubmit={onFormSubmit}

			showModal={showModal}
			closeModal={onCloseModal}

			alert={alert}
			closeAlert={removeAlert}

		/>
    )
}
