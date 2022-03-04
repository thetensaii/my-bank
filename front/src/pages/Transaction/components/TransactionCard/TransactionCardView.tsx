import Card from 'components/Card'
import React from 'react'
import { AccountProps } from 'utils/props/AccountProps'
import { TransactionProps } from 'utils/props/TransactionProps'
import { MdDeleteOutline } from 'react-icons/md'
import styles from './TransactionCard.module.css'

type TransactionCardViewProps = {
    transaction : TransactionProps,
    account : AccountProps,
    onDeleteIconClick: () => void
}

export const TransactionCardView:React.FC<TransactionCardViewProps> = ({ transaction, account, onDeleteIconClick }) => {
  return (
    <Card >
      <div className={styles.main}>
        <ul className={styles.infoList}>
            <li>Compte : {account.name}</li>
            <li>Montant : {transaction.amount} €</li>
            <li>Commentaire : {transaction.comment}</li>
            <li>Le : {transaction.created_at.toLocaleDateString()} à {transaction.created_at.toLocaleTimeString()}</li>
        </ul>

        <MdDeleteOutline className={styles.deleteIcon} onClick={onDeleteIconClick} />
      </div>
    </Card>
  )
}
