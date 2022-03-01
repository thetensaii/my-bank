import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteAccountAction } from 'redux/actions/accountActions'
import { AccountProps } from 'utils/props/AccountProps'
import { DeleteAccountFormModalView } from './DeleteAccountFormModalView'
import axios from 'axios'
import { AlertTypes } from 'components/Alert/AlertView'
import { useAlert } from 'hooks/useAlert'


type DeleteAccountFormModalContainerProps = {
    account : AccountProps,
    showModal : boolean,
    closeModal : () => void,
    onDeleteSuccess : (accountNAme:string) => void
}

export const DeleteAccountFormModalContainer:React.FC<DeleteAccountFormModalContainerProps> = ({ account, showModal, closeModal, onDeleteSuccess }) => {
  const dispatch = useDispatch();
  const [alert, updateAlert, removeAlert] = useAlert();

  const deleteAccount = async () => {
    try{
      await dispatch(deleteAccountAction(account.id));
      onDeleteSuccess(account.name);
    } catch(error) {
      if (axios.isAxiosError(error) && error.response) {
				console.error(error.response.data)
				updateAlert(AlertTypes.danger, error.response.data)
			} else if (error instanceof Error) {
				console.error(error.message);
				updateAlert(AlertTypes.danger, 'Une erreur a été rencontrée')
			}
    }

  }

  const onCloseModal = () => {
    closeModal();
    removeAlert();
  }

  return (
    <DeleteAccountFormModalView 
        account={account}
        alert={alert}
        closeAlert={removeAlert}
        showModal={showModal}
        closeModal={onCloseModal}
        deleteAccount={deleteAccount}
    />
  )
}
