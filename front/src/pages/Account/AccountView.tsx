import React from 'react'
import Header from 'components/Header'
import MainLayout from 'components/MainLayout'
import { AccountProps } from 'utils/props/AccountProps'
import AccountCard from './components/AccountCard'
import styles from './Account.module.css'
import { AlertTypes } from 'components/Alert/AlertView'
import Alert from 'components/Alert'
import AddAccountFormModal from './components/AddAccountFormModal'
import UpdateAccountFormModal from './components/UpdateAccountFormModal'
import DeleteAccountFormModal from './components/DeleteAccountFormModal'
type AccountViewProps = {
    accounts: AccountProps[]|null,
    selectedAccount : AccountProps | null,

    headerButtonOnClick: (e : React.MouseEvent<HTMLButtonElement>) => void,
    addAccountFunction : (data : {
      user_id : number,
      name : string,
      balance : number
    }) => Promise<void>,
    onAddAccountSuccess: (accountName:string) => void,

    alert : {type:AlertTypes, message :string} |null,
    closeAlert : () => void,

    showAddAccountModal : boolean,
    closeAddAccountModal : () => void,

    openUpdateModal: (accountID:number) => void,
    updateAccountFunction: (data : {name : string}) => Promise<void>,
    showUpdateAccountModal : boolean,
    closeUpdateAccountModal : () => void

    openDeleteModal: (accountID:number) => void,
    deleteAccountFunction: () => Promise<void>,
    onDeleteAccountSuccess: (accountName:string) => void,
    showDeleteAccountModal : boolean,
    closeDeleteAccountModal : () => void
}

export const AccountView:React.FC<AccountViewProps> = ({accounts, selectedAccount, headerButtonOnClick, addAccountFunction,onAddAccountSuccess, showAddAccountModal, closeAddAccountModal, alert, closeAlert, openUpdateModal, updateAccountFunction, showUpdateAccountModal, closeUpdateAccountModal, openDeleteModal, deleteAccountFunction, onDeleteAccountSuccess, showDeleteAccountModal, closeDeleteAccountModal}) => {

    
  return (
    <MainLayout>
        <Header title='comptes' buttonText='Créer un compte' buttonOnClick={headerButtonOnClick}/>
        {accounts &&
        <div className={styles.main}>
            <ul>
                {accounts.map(account => <AccountCard key={account.id} account={account} openUpdateModal={openUpdateModal} openDeleteModal={openDeleteModal}/>)}
            </ul>
        </div>}
        
        {alert && <Alert type={alert.type} closeAlert={closeAlert}>{alert.message}</Alert>}
        <AddAccountFormModal addAccountFunction={addAccountFunction} onAddSuccess={onAddAccountSuccess} showModal={showAddAccountModal} closeModal={closeAddAccountModal}/>
        {selectedAccount && <UpdateAccountFormModal account={selectedAccount} updateAccountFunction={updateAccountFunction} showModal={showUpdateAccountModal} closeModal={closeUpdateAccountModal} />}
        {selectedAccount && <DeleteAccountFormModal account={selectedAccount} deleteAccountFunction={deleteAccountFunction} onDeleteSuccess={onDeleteAccountSuccess} showModal={showDeleteAccountModal} closeModal={closeDeleteAccountModal} />}
    </MainLayout>
  )
}
