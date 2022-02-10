import Alert from 'components/Alert';
import { AlertTypes } from 'components/Alert/AlertView';
import React, { FormEvent } from 'react';
import { UserProps } from 'utils/props/UserProps';
import styles from './ProfileForm.module.css'

type ProfileFormViewProps = {
  user:UserProps,
  onUserUpdate: (e:React.FormEvent<HTMLFormElement>) => void,
  onUserPasswordUpdate: (e:React.FormEvent<HTMLFormElement>) => void,
  alert:{type:AlertTypes, message:string}|null
}

export const ProfileFormView:React.FC<ProfileFormViewProps> = ({user, onUserUpdate, onUserPasswordUpdate, alert}) => {
  return <>
    <form className={styles.profileForm} onSubmit={onUserUpdate}>
      <div className={styles.formControl}>
        <label htmlFor="login" className={styles.label}>Pseudo</label>
        <input type="text" id="login" name="login" placeholder="Pseudo.." defaultValue={user.login} className={styles.inputText} />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="firstname" className={styles.label}>Prénom</label>
        <input type="text" id="firstname" name="firstname" placeholder="Prénom.." defaultValue={user.firstname} className={styles.inputText} />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="lastname" className={styles.label}>Nom</label>
        <input type="text" id="lastname" name="lastname" placeholder="Nom.." defaultValue={user.lastname} className={styles.inputText} />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input type="email" id="email" name="email" placeholder="E-mail.." defaultValue={user.email} className={styles.inputText} />
      </div>
      <button className={styles.saveButton}>
        Mettre à jour le profil
      </button>

    </form>
      <hr />
    <form className={styles.profileForm} onSubmit={onUserPasswordUpdate}>
      <div className={styles.formControl}>
        <label htmlFor="password" className={styles.label}>Nouveau mot de passe</label>
        <input type="password" id="password" name="password" placeholder="Mot de passe.." className={styles.inputText} />
      </div>
      <button className={styles.saveButton}>
        Mettre à jour le mot de passe
      </button>
    </form>
    {alert && <Alert type={alert.type}>{alert.message}</Alert>}
    
  </> 


};
