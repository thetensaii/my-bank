import { AlertTypes } from 'components/Alert/AlertView';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'redux/selectors/userSelectors';
import { UserService } from 'services/userService';
import { getFormData } from 'utils/functions';
import { ProfileFormView } from './ProfileFormView';
import axios from 'axios'
import { updateUserAction } from 'redux/actions/userActions';
import { useAlert } from 'hooks/useAlert';



type ProfileFormContainerProps = {
}

export const ProfileFormContainer:React.FC<ProfileFormContainerProps> = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const [alert, updateAlert, removeAlert] = useAlert()

  const onUserUpdate = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    removeAlert();
    const userUpdateForm = e.currentTarget;
    const userUpdateDataRaw = getFormData(userUpdateForm);
    const userUpdateData = {
      login: userUpdateDataRaw.login as string,
      firstname: userUpdateDataRaw.firstname as string,
      lastname: userUpdateDataRaw.lastname as string,
      email: userUpdateDataRaw.email as string
    }
    
    if(
      userUpdateData.login === user!.login &&
      userUpdateData.firstname === user!.firstname &&
      userUpdateData.lastname === user!.lastname &&
      userUpdateData.email === user!.email
    ){
      updateAlert(AlertTypes.info, "Aucune modification n'a été effectué.");
      return
    }

    try{
      await dispatch(updateUserAction(user!.id, userUpdateData));
      updateAlert(AlertTypes.success, "Utilisateur modifié");
    } catch(error){
      userUpdateForm.login.focus();

      if (axios.isAxiosError(error)) {
        if (error.response?.data.errors) {
          const errors = [...error.response.data.errors]
          updateAlert(AlertTypes.danger, errors[0])
        } else {
          updateAlert(AlertTypes.danger, "Une erreur a été rencontré");
        }
      } else if (error instanceof Error) {
          console.log(error.message);
      }
    }

  }
  
  const onUserPasswordUpdate = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    removeAlert();
    const userPasswordUpdateForm:HTMLFormElement = e.currentTarget;
    const userPasswordUpdateData = getFormData(userPasswordUpdateForm);

    try{
      await UserService.updateUserPassword(user!.id, userPasswordUpdateData)
      userPasswordUpdateForm.password.value = '';

      updateAlert(AlertTypes.success, "Mot de passe modifié");
    } catch(error){
      userPasswordUpdateForm.password.focus();

      if (axios.isAxiosError(error)) {
        if (error.response?.data.errors) {
          const errors = [...error.response.data.errors];
          updateAlert(AlertTypes.danger, errors[0]);
        } else {
          updateAlert(AlertTypes.danger, "Une erreur a été rencontré");
        }
      } else if (error instanceof Error) {
          console.log(error.message);
      }
    }
  }

  return <ProfileFormView user={user!} onUserUpdate={onUserUpdate} onUserPasswordUpdate={onUserPasswordUpdate} alert={alert} closeAlert={removeAlert}/>;
};
