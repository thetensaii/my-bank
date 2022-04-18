import { useCallback, useEffect, useState } from "react";
import { TransactionService } from "services/transactionService";
import { AccountProps } from "utils/props/AccountProps";
import { TransactionProps } from "utils/props/TransactionProps";
import useToggle from "./useToggle"


export const useTransactions = (accounts: AccountProps[]):{
    loadingTransactions : boolean,
    transactions : TransactionProps[],
    transaction : TransactionProps| null,
    selectTransactionByID : (transactionID : number) => void,
    deselectTransaction : () => void,
    fetchTransactions : (accounts : AccountProps[]) => Promise<void>,
    addTransaction : (data : {
        account_id : number,
        amount : number,
        comment : string
    }) => Promise<void>,
    deleteTransaction : () => Promise<void>
} => {
    const [loadingTransactions, toggleLoading] = useToggle(false);
    const [transactions, setTransactions] = useState<TransactionProps[]>([]);

    const [transactionID, setTransactionID] = useState<number|null>(null);
    const [transaction, setTransaction] = useState<TransactionProps|null>(null);

    useEffect(() => {
        if(transactionID){
            setTransaction(transactions.find(t => t.id === transactionID) || null);
        } else {
            setTransaction(null);
        }
    }, [transactionID, transactions, setTransaction])

	
    
    const fetchTransactions = useCallback(async (accounts:AccountProps[]) => {
		toggleLoading();
        try{
			const transactionsByAccounts = await Promise.all(accounts.map(async account => TransactionService.getAccountTransactions(account.id))); 
            const newTransactions = transactionsByAccounts.reduce((previousState, accountList) => 
			[...previousState, ...accountList]
            , []);
            setTransactions(newTransactions.sort((a, b) => b.created_at.getTime() - a.created_at.getTime()));
            toggleLoading();
        }catch(error){
			toggleLoading();
            console.log(error);
            // TODO : Manage Alert with redux store
        }
    }, [toggleLoading, setTransactions]);

	useEffect(() => {
		fetchTransactions(accounts);
	}, [accounts, fetchTransactions]);
    
    const selectTransactionByID = useCallback((transactionID:number) => {
		setTransactionID(transactionID);
    }, []);
	
    const deselectTransaction = useCallback(() => {
        setTransactionID(null)
    }, []);

    const addTransaction = useCallback(async (data : {
        account_id : number,
        amount : number,
        comment : string
    }) => {
        const newTransaction = await TransactionService.addTransaction(data);
        setTransactions(transactions => [newTransaction, ...transactions]);
    }, []);
    
    const deleteTransaction = useCallback(async () => {
        if(transactionID){
            await TransactionService.deleteTransaction(transactionID);
            setTransactions(transactions.filter(t => t.id !== transactionID));
            setTransactionID(null);
        } else{
            // TODO : Alert no transaction selected

        }
    }, [transactionID, transactions]);

    return {
        loadingTransactions: loadingTransactions,
        transactions: transactions,
        transaction : transaction,
        selectTransactionByID : selectTransactionByID,
        deselectTransaction : deselectTransaction,
        fetchTransactions: fetchTransactions,
        addTransaction : addTransaction,
        deleteTransaction : deleteTransaction
    }
}