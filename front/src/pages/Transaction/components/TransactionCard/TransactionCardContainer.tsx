import React from 'react'
import { AccountProps } from 'utils/props/AccountProps'
import { TransactionProps } from 'utils/props/TransactionProps'
import { TransactionCardView } from './TransactionCardView'

type TransactionCardContainerProps = {
    transaction : TransactionProps
    account : AccountProps,
    openDeleteModal: (transactionID:number) => void
}

export const TransactionCardContainer:React.FC<TransactionCardContainerProps> = ({ transaction, account, openDeleteModal }) => {

    const onDeleteIconClick = () => {
        openDeleteModal(transaction.id);
    }

    return (
        <TransactionCardView 
            transaction={transaction}
            account={account}
            onDeleteIconClick={onDeleteIconClick}
        />
    )
}
