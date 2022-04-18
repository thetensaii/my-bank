import { AlertTypes } from "components/Alert/AlertView";
import { useAccounts } from "hooks/useAccounts";
import { useAlert } from "hooks/useAlert";
import { useTransactions } from "hooks/useTransactions";
import React, { useEffect, useState } from "react";
import { TransactionView } from "./TransactionView";

enum TRANSACTION_MODALS {
  ADD,
  DELETE,
}

type TransactionContainerProps = {};

export const TransactionContainer: React.FC<TransactionContainerProps> = () => {
  const {
    loadingAccounts,
    accounts,
    account,
    selectAccountByID,
    deselectAccount,
  } = useAccounts();
  const {
    loadingTransactions,
    transactions,
    transaction,
    selectTransactionByID,
    deselectTransaction,
    addTransaction,
    deleteTransaction,
  } = useTransactions(accounts);

  const [selectedModal, setSelectedModal] = useState<TRANSACTION_MODALS | null>(
    null
  );
  const [addTransactionModal, setAddTransactionModal] =
    useState<boolean>(false);
  const [deleteTransactionModal, setDeleteTransactionModal] =
    useState<boolean>(false);

  const [alert, updateAlert, removeAlert] = useAlert();


  useEffect(() => {
    if (transaction) {
      selectAccountByID(transaction.account_id);
    } else {
      deselectAccount();
    }
  }, [transaction, selectAccountByID, deselectAccount]);

  useEffect(() => {
    switch (selectedModal) {
      case TRANSACTION_MODALS.ADD:
        setAddTransactionModal(true);
        setDeleteTransactionModal(false);
        return;
      case TRANSACTION_MODALS.DELETE:
        setAddTransactionModal(false);
        setDeleteTransactionModal(true);
        return;
      case null:
        setAddTransactionModal(false);
        setDeleteTransactionModal(false);
    }
  }, [selectedModal, setAddTransactionModal, setDeleteTransactionModal]);

  const handleHeaderButtonClick = (): void => {
    if (accounts && accounts.length === 0) {
      updateAlert(AlertTypes.danger, "Pas de compte créé.");
    } else {
      setSelectedModal(TRANSACTION_MODALS.ADD);
    }
  };

  const closeAddTransactionModal = () => {
    setSelectedModal(null);
  };

  const closeDeleteTransactionModal = () => {
    setSelectedModal(null);
    deselectTransaction();
  };

  const onAddTransactionSuccess = () => {
    updateAlert(AlertTypes.success, "La transaction a bien été créé.");
    closeAddTransactionModal();
  };

  const onDeleteTransactionSuccess = () => {
    updateAlert(AlertTypes.success, "La transaction a bien été supprimé.");
    closeDeleteTransactionModal();
  };

  const openDeleteModal = (transactionID: number) => {
    selectTransactionByID(transactionID);
    setSelectedModal(TRANSACTION_MODALS.DELETE);
    removeAlert();
  };

  return !loadingAccounts && !loadingTransactions ? (
    <TransactionView
      accounts={accounts}
      transactions={transactions}
      transaction={transaction}
      account={account}
      alert={alert}
      closeAlert={removeAlert}
      headerButtonOnClick={handleHeaderButtonClick}
      addTransactionFunction={addTransaction}
      showAddTransactionModal={addTransactionModal}
      closeAddTransactionModal={closeAddTransactionModal}
      onAddTransactionSuccess={onAddTransactionSuccess}
      openDeleteModal={openDeleteModal}
      deleteTransactionFunction={deleteTransaction}
      onDeleteTransactionSuccess={onDeleteTransactionSuccess}
      showDeleteTransactionModal={deleteTransactionModal}
      closeDeleteTransactionModal={closeDeleteTransactionModal}
    />
  ) : null;
};
