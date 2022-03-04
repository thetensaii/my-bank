import { TransactionProps } from "utils/props/TransactionProps";

export const transactionsSelector = ({transactions} : {transactions : TransactionProps[]|null}) : TransactionProps[]|null => transactions