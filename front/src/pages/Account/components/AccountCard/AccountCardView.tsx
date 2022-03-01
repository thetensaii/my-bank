import Card from 'components/Card'
import React from 'react'
import { AccountProps } from 'utils/props/AccountProps'
import { VscOpenPreview } from 'react-icons/vsc'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import styles from './AccountCard.module.css'
type AccountCardViewProps = {
    account : AccountProps,
    onUpdateIconClick: () => void,
    onDeleteIconClick: () => void
}

export const AccountCardView:React.FC<AccountCardViewProps> = ({account, onUpdateIconClick, onDeleteIconClick}) => {
  return (
      <Card title={account.name}>
          Solde : {account.balance} €

          <hr />
          <div className={styles.iconsList}>
            <VscOpenPreview className={`${styles.icon} ${styles.openIcon}`} />
            <FiEdit className={`${styles.icon} ${styles.editIcon}`} onClick={onUpdateIconClick} />
            <MdDeleteOutline className={`${styles.icon} ${styles.deleteIcon}`} onClick={onDeleteIconClick} />
          </div>
      </Card>
  )
}
