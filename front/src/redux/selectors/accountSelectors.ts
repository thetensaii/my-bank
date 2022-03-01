import { AccountProps } from "utils/props/AccountProps"

export const accountsSelector = ({accounts} : {accounts : AccountProps[]|null}) : AccountProps[]|null => accounts