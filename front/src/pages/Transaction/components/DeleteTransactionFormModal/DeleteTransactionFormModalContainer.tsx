import { AlertTypes } from 'components/Alert/AlertView'
import { useAccounts } from 'hooks/useAccounts'
import { useAlert } from 'hooks/useAlert'
import React, { useEffect } from 'react'
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
            updateAlert(AlertTypes.danger, 'Une erreur a été rencontrée')
        }
    }
    
    return (

        <DeleteTransactionFormModalView 
            transaction={transaction}
            account={account}
            deleteTransaction={deleteTransaction}
            showModal={showModal}
            closeModal={closeModal}
            alert={alert}
            closeAlert={removeAlert}
        />
    )
}
