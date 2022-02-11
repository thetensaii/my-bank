import { AlertTypes } from 'components/Alert/AlertView';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from 'redux/actions/userActions';
import { userSelector } from 'redux/selectors/userSelectors';
import { updateUser, updateUserPassword } from 'services/userService';
import { getFormData } from 'utils/functions';
import { UserProps } from 'utils/props/UserProps';
import { ProfileFormView } from './ProfileFormView';
import axios from 'axios'



type ProfileFormContainerProps = {
}

export const ProfileFormContainer:React.FC<ProfileFormContainerProps> = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState<{type:AlertTypes, message:string}|null>(null)

  const onUserUpdate = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setAlert(null)
    const userUpdateForm = e.currentTarget;
    const userUpdateData = getFormData(userUpdateForm);
    
    if(
      userUpdateData.login === user!.login &&
      userUpdateData.firstname === user!.firstname &&
      userUpdateData.lastname === user!.lastname &&
      userUpdateData.email === user!.email
    ){
      setAlert({
        type : AlertTypes.info,
        message : "Aucune modification n'a été effectué."
      })
      return
    }

    try{
      const updatedUser:UserProps = await updateUser(user!.id, userUpdateData)
      dispatch(setUserAction(updatedUser))
      setAlert({
        type : AlertTypes.success,
        message : "Utilisateur modifié"
      })
    } catch(error){
      userUpdateForm.login.focus();

      if (axios.isAxiosError(error)) {
        if (error.response?.data.errors) {
          const errors = [...error.response.data.errors]
          setAlert({
            type: AlertTypes.danger, 
            message: errors[0]
          });
        } else {
            setAlert({
              type: AlertTypes.danger, 
              message: "Une erreur a été rencontré"
            });
        }
      } else if (error instanceof Error) {
          console.log(error.message);
      }
    }

  }
  
  const onUserPasswordUpdate = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setAlert(null);
    const userPasswordUpdateForm:HTMLFormElement = e.currentTarget;
    const userPasswordUpdateData = getFormData(userPasswordUpdateForm);

    try{
      await updateUserPassword(user!.id, userPasswordUpdateData)
      userPasswordUpdateForm.password.value = '';

      setAlert({
        type : AlertTypes.success,
        message : "Mot de passe modifié"
      })
    } catch(error){
      userPasswordUpdateForm.password.focus();

      if (axios.isAxiosError(error)) {
        if (error.response?.data.errors) {
          const errors = [...error.response.data.errors]
          setAlert({
            type: AlertTypes.danger, 
            message: errors[0]
          });
        } else {
            setAlert({
              type: AlertTypes.danger, 
              message: "Une erreur a été rencontré"
            });
        }
      } else if (error instanceof Error) {
          console.log(error.message);
      }
    }
  }

  return <ProfileFormView user={user!} onUserUpdate={onUserUpdate} onUserPasswordUpdate={onUserPasswordUpdate} alert={alert} />;
};
