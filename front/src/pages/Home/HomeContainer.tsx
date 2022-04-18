import { useAccounts } from "hooks/useAccounts";
import { useTransactions } from "hooks/useTransactions";
import React, { useEffect, useState } from "react";
import { TransactionProps } from "utils/props/TransactionProps";
import { HomeView } from "./HomeView";

type HomeContainerProps = {};

export const HomeContainer: React.FC<HomeContainerProps> = () => {
	const { accounts } = useAccounts();
	const {transactions, fetchTransactions} = useTransactions(accounts);
	const [filteredTransactions, setFilteredTransactions] = useState<TransactionProps[]>([]);

	useEffect(() => {
		fetchTransactions(accounts);
	}, [accounts, fetchTransactions]);

	useEffect(() => {
		const today = new Date();
		const thirtyDaysAgoDate = new Date(new Date().setDate(today.getDate() - 30));

		setFilteredTransactions(transactions.filter(transaction => transaction.created_at > thirtyDaysAgoDate ))

	}, [transactions, setFilteredTransactions])



  return <HomeView accounts={accounts} transactions={filteredTransactions} />;
};