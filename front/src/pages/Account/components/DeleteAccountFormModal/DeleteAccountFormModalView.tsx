import Alert from 'components/Alert'
import { AlertTypes } from 'components/Alert/AlertView'
import SubmitButton from 'components/Form/components/SubmitButton'
import Modal from 'components/Modal'
import React from 'react'
import { AccountProps } from 'utils/props/AccountProps'
import styles from './DeleteAccountFormModal.module.css'


type DeleteAccountFormModalViewProps = {
  account : AccountProps,
  deleteAccount: () => void
  alert : {type:AlertTypes, message : string} | null,
  closeAlert : () => void,
  showModal : boolean,
  closeModal : () => void
}

export const DeleteAccountFormModalView:React.FC<DeleteAccountFormModalViewProps> = ({ account, alert, closeAlert, showModal, closeModal, deleteAccount}) => {
  return (
    <Modal title={`Suppression du compte ${account.name}`} showModal={showModal} closeModal={closeModal}>
      <div className={styles.main}>
        <h4>Êtes-vous sûr de vouloir supprimer le compte suivant :</h4>
        <ul className={styles.infoList}>
            <li>Nom : {account.name}</li>
            <li>Solde : {account.balance} €</li>
            <li>Créé le : {account.created_at}</li>
        </ul>
        <SubmitButton onClick={deleteAccount}>Suppprimer le compte</SubmitButton>
      </div>

      {alert && <Alert type={alert.type} closeAlert={closeAlert}>{alert.message}</Alert>}
    </Modal>
  )
}
