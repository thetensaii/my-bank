import React, { useEffect } from 'react'
import { AlertTypes } from 'components/Alert/AlertView'
import { useAlert } from 'hooks/useAlert'
import { CreateTransactionFormModalView } from './CreateTransactionFormModalView'
import { getFormData } from 'utils/functions'
import { AccountProps } from 'utils/props/AccountProps'

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
			// await dispatch(addTransactionAction(addTransactionFormData))
			await addTransactionFunction(addTransactionData)
			onAddTransactionSuccess();
		} catch (error){
			console.error(error)
			// updateAlert(AlertTypes.danger, error.message);
		}
	}
    
    return (
		<CreateTransactionFormModalView
			accounts={accounts}

			onFormSubmit={onFormSubmit}

			showModal={showModal}
			closeModal={closeModal}

			alert={alert}
			closeAlert={removeAlert}

		/>
    )
}
