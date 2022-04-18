import React from "react";
import { AccountProps } from "utils/props/AccountProps";
import { OverviewCardView } from "./OverviewCardView";

type OverviewCardContainerProps = {
  accounts: AccountProps[];
};

export const OverviewCardContainer: React.FC<OverviewCardContainerProps> = ({
  accounts,
}) => {
  let positiveAccounts: AccountProps[] = accounts
    .filter((acc) => acc.balance >= 0)
    .sort((a, b) => b.balance - a.balance);
  const positiveAccountsSum = positiveAccounts.reduce(
    (a, b) => a + b.balance,
    0
  );

  const negativeAccounts = accounts.filter((acc) => acc.balance < 0);
  const negativeAccountsSum = negativeAccounts.reduce(
    (value, acc) => acc.balance + value,
    0
  );

  let otherAccountsPresence: boolean = false;
  let otherAccountsSum: number = 0;

  if (positiveAccounts.length > 4) {
    otherAccountsPresence = true;
    otherAccountsSum = positiveAccounts
      .slice(4)
      .reduce((a, b) => a + b.balance, 0);
  }

  positiveAccounts = positiveAccounts.slice(0, 4);
  return (
    <OverviewCardView
      positiveAccounts={positiveAccounts}
      positiveAccountsSum={positiveAccountsSum}
      otherAccountsPresence={otherAccountsPresence}
      otherAccountsSum={otherAccountsSum}
      negativeAccountsPresence={negativeAccounts.length > 0}
      negativeAccountsSum={negativeAccountsSum}
    />
  );
};
