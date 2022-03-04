import React from 'react'
import Alert from 'components/Alert'
import { AlertTypes } from 'components/Alert/AlertView'
import Header from 'components/Header'
import MainLayout from 'components/MainLayout'
import CreateTransactionFormModal from './components/CreateTransactionFormModal'
import { AccountProps } from 'utils/props/AccountProps'
import { TransactionProps } from 'utils/props/TransactionProps'
import TransactionCard from './components/TransactionCard'
import styles from './Transaction.module.css'
import DeleteTransactionFormModal from './components/DeleteTransactionFormModal'


type TransactionViewProps = {
    accounts: AccountProps[],
    transactions: TransactionProps[],
    transaction : TransactionProps | null,
    account : AccountProps | null,

    alert : {type : AlertTypes, message : string} | null,
    closeAlert : () => void,
    headerButtonOnClick: () => void,

    addTransactionFunction : (data : {
      account_id : number,
      amount : number,
      comment : string
    }) => Promise<void>,
    showAddTransactionModal:boolean,
    closeAddTransactionModal:() => void,
    onAddTransactionSuccess : () => void

    openDeleteModal: (transactionID:number) => void,
    deleteTransactionFunction: () => Promise<void>,
    onDeleteTransactionSuccess: () => void,
    showDeleteTransactionModal : boolean,
    closeDeleteTransactionModal : () => void


}

export const TransactionView:React.FC<TransactionViewProps> = ({
    accounts, 
    transactions, 
    transaction, 
    account, 

    alert, 
    closeAlert,

    headerButtonOnClick, 

    addTransactionFunction, 
    showAddTransactionModal, 
    closeAddTransactionModal, 
    onAddTransactionSuccess, 

    openDeleteModal,
    deleteTransactionFunction,
    onDeleteTransactionSuccess,
    showDeleteTransactionModal,
    closeDeleteTransactionModal
  }) => {

  return (
    <MainLayout>
        <Header title='transactions' buttonText='Faire une transaction' buttonOnClick={headerButtonOnClick}/>
        <div className={styles.main}>

          {accounts.length === 0 ? 
            <h3>Pas de compte</h3> :
            (transactions.length === 0) ?
              <h3>Pas de transaction</h3> :
              <div>
                {transactions.map(transaction => {
                  const account = accounts.find(account => account.id === transaction.account_id);
                    if(account){
                      return <TransactionCard key={transaction.id} transaction={transaction} account={account} openDeleteModal={openDeleteModal}/>
                    } else {
                      return null
                    }
                  })
              }</div>
          }
        </div>

        {alert && <Alert type={alert.type} closeAlert={closeAlert}>{alert.message}</Alert>}
        <CreateTransactionFormModal 
            accounts={accounts} 
            addTransactionFunction={addTransactionFunction}
            showModal={showAddTransactionModal} 
            closeModal={closeAddTransactionModal} 
            onAddTransactionSuccess={onAddTransactionSuccess}
          />

        {transaction && account && <DeleteTransactionFormModal 
          transaction={transaction}
          account={account}
          deleteTransactionFunction={deleteTransactionFunction}
          onDeleteTransactionSuccess={onDeleteTransactionSuccess}
          showModal={showDeleteTransactionModal}
          closeModal={closeDeleteTransactionModal}
        />}
    </MainLayout>
  )
}
