import axios from 'axios'
import { AlertTypes } from 'components/Alert/AlertView'
import { useAlert } from 'hooks/useAlert'
import React from 'react'
import { AccountProps } from 'utils/props/AccountProps'
import { TransactionProps } from 'utils/props/TransactionProps'
import { DeleteTransactionFormModalView } from './DeleteTransactionFormModalView'


type DeleteTransactionFormModalContainerProps = {
    transaction: TransactionProps,
    account : AccountProps,
    deleteTransactionFunction: () => void,
    onDeleteTransactionSuccess: () => void,
    showModal : boolean,
    closeModal : () => void
}

export const DeleteTransactionFormModalContainer:React.FC<DeleteTransactionFormModalContainerProps> = ({ transaction, account,deleteTransactionFunction,onDeleteTransactionSuccess, showModal, closeModal}) => {
    const [alert, updateAlert, removeAlert] = useAlert();

    const deleteTransaction = async () => {
        removeAlert()

        try {
            await deleteTransactionFunction();
            onDeleteTransactionSuccess();
        } catch(error) {
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

        <DeleteTransactionFormModalView 
            transaction={transaction}
            account={account}
            deleteTransaction={deleteTransaction}
            showModal={showModal}
            closeModal={onCloseModal}
            alert={alert}
            closeAlert={removeAlert}
        />
    )
}
