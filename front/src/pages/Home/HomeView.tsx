import React from "react";
import MainLayout from "components/MainLayout";
import Header from "components/Header";
import styles from "./Home.module.css";
import { AccountProps } from "utils/props/AccountProps";
import OverviewCard from "./components/OverviewCard";
import ExpensesCard from "./components/ExpensesCard";
import { TransactionProps } from "utils/props/TransactionProps";
import RecipesCard from './components/RecipesCard'
type HomeViewProps = {
  accounts: AccountProps[];
  transactions: TransactionProps[];
};

export const HomeView: React.FC<HomeViewProps> = ({ accounts, transactions }) => {
  return (
    <MainLayout>
      <Header title="accueil" />
      <div className={styles.main}>
        <OverviewCard accounts={accounts} />
        <ExpensesCard accounts={accounts} transactions={transactions} />
        <RecipesCard accounts={accounts} transactions={transactions} />
      </div>
    </MainLayout>
  );
};
