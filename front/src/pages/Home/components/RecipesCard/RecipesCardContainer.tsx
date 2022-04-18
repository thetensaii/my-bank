import React from "react";
import { AccountProps } from "utils/props/AccountProps";
import { TransactionProps } from "utils/props/TransactionProps";
import { RecipesCardView } from "./RecipesCardView";

export type ExpensesCardContainerProps = {
  accounts: AccountProps[];
  transactions: TransactionProps[];
};

export const RecipesCardContainer: React.FC<ExpensesCardContainerProps> = ({
	accounts,
	transactions
}) => {

	let otherAccountsPresence: boolean = false;
	let otherAccountsSum: number = 0;

	const negativeTransactions = transactions.filter(t => t.amount < 0);
	let accountsWithSum = accounts.map(account => (
		{
			...account,
			transactionsSum: negativeTransactions.filter(t => t.account_id === account.id).reduce((sum, t) => sum + t.amount, 0),
			numberOfTransactions: negativeTransactions.filter(t => t.account_id === account.id).length
		}
	));

	accountsWithSum = accountsWithSum
								.filter(acc => acc.numberOfTransactions > 0)
    							.sort((a, b) => b.transactionsSum - a.transactionsSum);

	if (accountsWithSum.length > 4) {
		otherAccountsPresence = true;
		otherAccountsSum = accountsWithSum
			.slice(4)
			.reduce((a, b) => a + b.balance, 0);
	}

	accountsWithSum = accountsWithSum.slice(0, 4);

	return <RecipesCardView accounts={accountsWithSum}  otherAccountsPresence={otherAccountsPresence} otherAccountsSum={otherAccountsSum} />;
};
