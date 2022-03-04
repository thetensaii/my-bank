import Alert from 'components/Alert'
import { AlertTypes } from 'components/Alert/AlertView'
import SubmitButton from 'components/Form/components/SubmitButton'
import Modal from 'components/Modal'
import React from 'react'
import { AccountProps } from 'utils/props/AccountProps'
import { TransactionProps } from 'utils/props/TransactionProps'
import styles from './DeleteTransactionFormModal.module.css'

type DeleteTransactionFormModalViewProps = {
    transaction : TransactionProps,
    account : AccountProps,
    deleteTransaction : () => Promise<void>,

    showModal : boolean,
    closeModal : () => void,

    alert : {type : AlertTypes, message : string} | null,
    closeAlert : () => void
}

export const DeleteTransactionFormModalView:React.FC<DeleteTransactionFormModalViewProps> = ({transaction, account, deleteTransaction,showModal, closeModal, alert, closeAlert}) => {
  return (
    <Modal title='Annulation de transaction' showModal={showModal} closeModal={closeModal}>
        <div className={styles.main}>
        <h4>Êtes-vous sûr de vouloir annuler la transaction suivante :</h4>
        <ul className={styles.infoList}>
            <li>Compte : {account.name}</li>
            <li>Montant : {transaction.amount} €</li>
            <li>Créée le : {transaction.created_at.toLocaleDateString()} à {transaction.created_at.toLocaleTimeString()}</li>
        </ul>
        <SubmitButton onClick={deleteTransaction}>Annuler la transaction</SubmitButton>
      </div>

      {alert && <Alert type={alert.type} closeAlert={closeAlert}>{alert.message}</Alert>}

    </Modal>
  )
}
