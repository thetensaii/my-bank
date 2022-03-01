import React from 'react'
import { AccountProps } from 'utils/props/AccountProps'
import { AccountCardView } from './AccountCardView'

type AccountCardContainerProps = {
    account :  AccountProps,
    openUpdateForm : (accountID:number) => void,
    openDeleteForm : (accountID:number) => void
}

export const AccountCardContainer:React.FC<AccountCardContainerProps> = ({account, openUpdateForm, openDeleteForm}) => {
	const onUpdateIconClick = () => {
		openUpdateForm(account.id);
	}

	const onDeleteIconClick = () => {
		openDeleteForm(account.id);
	}

	return (
		<AccountCardView account={account} onUpdateIconClick={onUpdateIconClick} onDeleteIconClick={onDeleteIconClick}  />
	)
}
