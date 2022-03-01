import React, { useEffect, useState } from 'react'
import { AccountView } from './AccountView'
import { useSelector } from 'react-redux';
import { userSelector } from 'redux/selectors/userSelectors';
import useLoadAccounts from 'hooks/useLoadAccounts';
import { useAlert } from 'hooks/useAlert';
import { AlertTypes } from 'components/Alert/AlertView';
import useSelectAccount from 'hooks/useSelectAccount';

export enum ACCOUNT_MODALS {
    ADD ,
    UPDATE,
    DELETE
}

type AccountContainerProps = {

}

export const AccountContainer:React.FC<AccountContainerProps> = () => {
    const user = useSelector(userSelector);
    const [ loading , accounts] = useLoadAccounts(user!.id);
    const [alert, updateAlert, removeAlert] = useAlert();
    const [account, selectAccountByID] = useSelectAccount();

    // Modals
    const [selectedModal, setSelectedModal] = useState<ACCOUNT_MODALS | null>(null);
    const [addAccountModal, setAddAccountModal] = useState<boolean>(false);
    const [updateAccountModal, setUpdateAccountModal] = useState<boolean>(false);
    const [deleteAccountModal, setDeleteAccountModal] = useState<boolean>(false);


    const onAddAccountSuccess = (accountName:string) => {
        closeAddAccountModal();
        updateAlert(AlertTypes.success, `Le compte '${accountName}' a bien été ajouté`);
    }

    const onDeleteAccountSuccess = (accountName:string) => {
        closeDeleteAccountModal();
        updateAlert(AlertTypes.success, `Le compte '${accountName}' a bien été supprimé`);
    }

    const handleHeaderButtonClick = (e:React.MouseEvent<HTMLButtonElement>) : void => {
        setSelectedModal(ACCOUNT_MODALS.ADD);
    }
    
    const closeAddAccountModal:() => void = () => {
        setSelectedModal(null)

    }
    
    const closeUpdateAccountModal: () =>  void = () => {
        setSelectedModal(null)
    }
    
    const closeDeleteAccountModal: () =>  void = () => {
        setSelectedModal(null)
    }
    
    const openUpdateForm = async (accountID:number) => {
        selectAccountByID(accountID);
        setSelectedModal(ACCOUNT_MODALS.UPDATE);
    }
    
    const openDeleteForm = async (accountID:number) => {
        selectAccountByID(accountID);
        setSelectedModal(ACCOUNT_MODALS.DELETE);
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
    }, [account,selectedModal, setAddAccountModal, setUpdateAccountModal, setDeleteAccountModal]);

    return (
        <AccountView 
            accounts={accounts}
            
            headerButtonOnClick={handleHeaderButtonClick}
            onAddAccountSuccess={onAddAccountSuccess}
            alert={alert}
            closeAlert={removeAlert}
            
            showAddAccountModal={addAccountModal}
            closeAddAccountModal={closeAddAccountModal}
            
            selectedAccount={account}

            openUpdateForm={openUpdateForm}
            showUpdateAccountModal={updateAccountModal}
            closeUpdateAccountModal={closeUpdateAccountModal}

            openDeleteForm={openDeleteForm}
            onDeleteAccountSuccess={onDeleteAccountSuccess}
            showDeleteAccountModal={deleteAccountModal}
            closeDeleteAccountModal={closeDeleteAccountModal}
        />
    )
}

