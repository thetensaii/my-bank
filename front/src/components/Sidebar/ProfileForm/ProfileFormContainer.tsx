import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'redux/selectors/userSelectors';
import { ProfileFormView } from './ProfileFormView';



type ProfileFormContainerProps = {

}

export const ProfileFormContainer:React.FC<ProfileFormContainerProps> = () => {
  const user = useSelector(userSelector)

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SUBMIT");
  }


  return <ProfileFormView user={user!} onSubmit={onSubmit} />;
};
