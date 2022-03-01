import React from 'react'
import axios from 'axios'
import { AddAccountFormModalView } from './AddAccountModalFormView'
import { getFormData } from 'utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { addAccountAction } from 'redux/actions/accountActions';
import { userSelector } from 'redux/selectors/userSelectors';
import { useAlert } from 'hooks/useAlert';
import { AlertTypes } from 'components/Alert/AlertView';


type AddAccountModalFormContainerProps = {
	onAddSuccess: (accountName:string) => void,
	showModal: boolean,
	closeModal: () => void
}

export const AddAccountModalFormContainer:React.FC<AddAccountModalFormContainerProps> = ({onAddSuccess, showModal, closeModal}) => {
    const dispatch = useDispatch();
	const user = useSelector(userSelector);
    const [alert, updateAlert, removeAlert] = useAlert();

    const defaultErrorMessage = "Une erreur a été rencontrée.";
	
	const onCloseModal = () => {
		removeAlert();
		closeModal();
	}

    const onFormSubmit = async (e:React.FormEvent<HTMLFormElement>) : Promise<void> => {
		e.preventDefault();

		const addAccountForm = e.currentTarget;
		const addAccountFormDataRaw = getFormData(addAccountForm);
		const addAccountData = {
			user_id : user!.id,
			name : addAccountFormDataRaw.name as string,
			balance : addAccountFormDataRaw.balance as string
		}
		try{
			await dispatch(addAccountAction(addAccountData));
			onAddSuccess(addAccountData.name);
			
		} catch(error){
			if (axios.isAxiosError(error) && error.response) {
				console.error(error.response.data)
				updateAlert(AlertTypes.danger, error.response.data)
			} else if (error instanceof Error) {
				console.error(error.message);
				updateAlert(AlertTypes.danger, defaultErrorMessage)
			}
		}
  }

  return (
    <AddAccountFormModalView 
		onFormSubmit={onFormSubmit}
		showModal={showModal}
		closeModal={onCloseModal} 
		alert={alert}
		closeAlert={removeAlert}
	/>
  )
}
