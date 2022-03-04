import React from 'react'
import { AccountProps } from 'utils/props/AccountProps'
import { AccountCardView } from './AccountCardView'

type AccountCardContainerProps = {
    account :  AccountProps,
    openUpdateModal : (accountID:number) => void,
    openDeleteModal : (accountID:number) => void
}

export const AccountCardContainer:React.FC<AccountCardContainerProps> = ({account, openUpdateModal, openDeleteModal}) => {
	const onUpdateIconClick = () => {
		openUpdateModal(account.id);
	}

	const onDeleteIconClick = () => {
		openDeleteModal(account.id);
	}

	return (
		<AccountCardView account={account} onUpdateIconClick={onUpdateIconClick} onDeleteIconClick={onDeleteIconClick}  />
	)
}
