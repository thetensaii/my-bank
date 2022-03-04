import { useEffect, useState } from "react";
import { TransactionService } from "services/transactionService";
import { AccountProps } from "utils/props/AccountProps";
import { TransactionProps } from "utils/props/TransactionProps";
import useToggle from "./useToggle"


export const useTransactions = ():{
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
    }, [transactionID, setTransaction])
    
    const fetchTransactions = async (accounts:AccountProps[]) => {
        toggleLoading();
        try{
            const transactionsByAccounts = await Promise.all(accounts.map(async account => TransactionService.getAccountTransactions(account.id))); 
            const newTransactions = transactionsByAccounts.reduce((previousState, accountList) => 
                [...previousState, ...accountList]
            , [])
            setTransactions(newTransactions.sort((a, b) => b.created_at.getTime() - a.created_at.getTime()));
            toggleLoading();
        }catch(error){
            toggleLoading();
            console.log(error)
            // TODO : Manage Alert with redux store
        }
    }

    const selectTransactionByID = (transactionID:number) => {
        setTransactionID(transactionID);
    }

    const deselectTransaction = () => {
        setTransactionID(null)
    }

    const addTransaction = async (data : {
        account_id : number,
        amount : number,
        comment : string
    }) => {
        const newTransaction = await TransactionService.addTransaction(data);
        setTransactions(transactions => [newTransaction, ...transactions]);
    }

    const deleteTransaction = async () => {
        if(transactionID){
            await TransactionService.deleteTransaction(transactionID);
            setTransactions(transactions.filter(t => t.id !== transactionID));
            setTransactionID(null);
        } else{

        }
    }

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