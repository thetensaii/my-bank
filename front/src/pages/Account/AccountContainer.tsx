import React, { useEffect, useState } from 'react'
import { AccountView } from './AccountView'
import { useAlert } from 'hooks/useAlert';
import { AlertTypes } from 'components/Alert/AlertView';
import { useAccounts } from 'hooks/useAccounts';

export enum ACCOUNT_MODALS {
    ADD ,
    UPDATE,
    DELETE
}

type AccountContainerProps = {

}

export const AccountContainer:React.FC<AccountContainerProps> = () => {
    const {
        accounts, 
        account, 
        addAccount, 
        updateAccount, 
        deleteAccount,
        selectAccountByID, 
        deselectAccount
    } = useAccounts();

    // Alert
    const [alert, updateAlert, removeAlert] = useAlert();

    // Modals
    const [selectedModal, setSelectedModal] = useState<ACCOUNT_MODALS | null>(null);
    const [addAccountModal, setAddAccountModal] = useState<boolean>(false);
    const [updateAccountModal, setUpdateAccountModal] = useState<boolean>(false);
    const [deleteAccountModal, setDeleteAccountModal] = useState<boolean>(false);


    const onAddAccountSuccess = async (accountName:string) => {
        closeAddAccountModal();
        updateAlert(AlertTypes.success, `Le compte '${accountName}' a bien été ajouté`);
    }
    
    const onDeleteAccountSuccess = async (accountName:string) => {
        closeDeleteAccountModal();
        updateAlert(AlertTypes.success, `Le compte '${accountName}' a bien été supprimé`);
    }

    const handleHeaderButtonClick = (e:React.MouseEvent<HTMLButtonElement>) : void => {
        removeAlert();
        setSelectedModal(ACCOUNT_MODALS.ADD);
    }
    
    const closeAddAccountModal:() => void = () => {
        setSelectedModal(null);
    }
    
    const closeUpdateAccountModal: () =>  void = () => {
        setSelectedModal(null);
        deselectAccount();
    }
    
    const closeDeleteAccountModal: () =>  void = () => {
        setSelectedModal(null);
        deselectAccount();
    }
    
    const openUpdateModal = async (accountID:number) => {
        selectAccountByID(accountID);
        setSelectedModal(ACCOUNT_MODALS.UPDATE);
        removeAlert();
    }
    
    const openDeleteModal = async (accountID:number) => {
        selectAccountByID(accountID);
        setSelectedModal(ACCOUNT_MODALS.DELETE);
        removeAlert();
    }

    useEffect(() => {
        switch(selectedModal){
            case ACCOUNT_MODALS.ADD:
                setAddAccountModal(true);
                setUpdateAccountModal(false);
                setDeleteAccountModal(false);
                return
            case ACCOUNT_MODALS.UPDATE:
                if(account){
                    setAddAccountModal(false);
                    setUpdateAccountModal(true);
                    setDeleteAccountModal(false);
                }
                return
            case ACCOUNT_MODALS.DELETE:
                if(account){
                    setAddAccountModal(false);
                    setUpdateAccountModal(false);
                    setDeleteAccountModal(true);
                }
                return
            case null:
                setAddAccountModal(false);
                setUpdateAccountModal(false);
                setDeleteAccountModal(false);
                return
            default :
                return
        }
    }, [account, selectedModal, setAddAccountModal, setUpdateAccountModal, setDeleteAccountModal]);

    return (
        <AccountView 
            accounts={accounts}
            
            headerButtonOnClick={handleHeaderButtonClick}
            addAccountFunction={addAccount}
            onAddAccountSuccess={onAddAccountSuccess}
            alert={alert}
            closeAlert={removeAlert}
            
            showAddAccountModal={addAccountModal}
            closeAddAccountModal={closeAddAccountModal}
            
            selectedAccount={account}

            openUpdateModal={openUpdateModal}
            updateAccountFunction={updateAccount}
            showUpdateAccountModal={updateAccountModal}
            closeUpdateAccountModal={closeUpdateAccountModal}

            openDeleteModal={openDeleteModal}
            deleteAccountFunction={deleteAccount}
            onDeleteAccountSuccess={onDeleteAccountSuccess}
            showDeleteAccountModal={deleteAccountModal}
            closeDeleteAccountModal={closeDeleteAccountModal}
        />
    )
}

