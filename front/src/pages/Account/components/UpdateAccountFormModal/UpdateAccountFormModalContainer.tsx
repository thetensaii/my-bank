import { AlertTypes } from 'components/Alert/AlertView'
import { useAlert } from 'hooks/useAlert'
import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateAccountAction } from 'redux/actions/accountActions'
import { getFormData } from 'utils/functions'
import { AccountProps } from 'utils/props/AccountProps'
import { UpdateAccountFormModalView } from './UpdateAccountFormModalView'


type UpdateAccountFormModalContainerProps = {
    account : AccountProps
    showModal: boolean,
    closeModal: () => void
}

export const UpdateAccountFormModalContainer:React.FC<UpdateAccountFormModalContainerProps> = ({account, showModal, closeModal}) => {
    const [alert, updateAlert, removeAlert] = useAlert();
    const dispatch = useDispatch();

    const onFormSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const updateAccountForm = e.currentTarget;
		const updateAccountFormDataRaw = getFormData(updateAccountForm);
        const updateAccountData  = {
            name : updateAccountFormDataRaw.name as string
        }

        if(account.name === updateAccountData.name) {
            updateAlert(AlertTypes.info, "Aucune modification n'a été effectué.");
            return
        }

        try{
            await dispatch(updateAccountAction(account.id, updateAccountData));
            updateAlert(AlertTypes.success, "Le compte a bien été mis à jour !");
        } catch(error){
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
        <UpdateAccountFormModalView
            account={account}
            showModal={showModal}
            closeModal={onCloseModal}
            alert={alert}
            closeAlert={removeAlert}
            onFormSubmit={onFormSubmit}
        />
    )
}
