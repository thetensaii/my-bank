import { apiBackRequest, ApiPaths } from "utils/api"
import { TransactionProps } from "utils/props/TransactionProps";

export class TransactionService {

    static async getAccountTransactions(accountID : number): Promise<TransactionProps[]> {
        const {data : transactionsResponse} : {data : TransactionResponseProps[]} = await apiBackRequest(`${ApiPaths.ACCOUNT_OPERATIONS}/${accountID}`);
        
        const transactions = transactionsResponse.map(t => convertTransactionResponseToTransaction(t));

        return transactions;
    }

    static async addTransaction(data : {
        account_id : number,
        amount : number,
        comment : string
    }):Promise<TransactionProps> {
        const {data : transactionResponse} : {data : TransactionResponseProps} = await apiBackRequest(`${ApiPaths.OPERATIONS}`, {
            method : 'POST',
            data : data
        });

        return convertTransactionResponseToTransaction(transactionResponse);
    }

    static async deleteTransaction(transactionID : number){
        const {status} = await apiBackRequest(`${ApiPaths.OPERATIONS}/${transactionID}`, {
            method : 'DELETE'
        })

        return status === 200;
    }
}

type TransactionResponseProps = {
    created_at : string
} & TransactionProps

const convertTransactionResponseToTransaction = (transactionResponse : TransactionResponseProps) : TransactionProps=> {
    return {
        ...transactionResponse,
        created_at : new Date(transactionResponse.created_at)
    }
}  
