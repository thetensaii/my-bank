import React from "react";
import { createPortal } from "react-dom";
import styles from "./Alert.module.css";
import { MdClose } from "react-icons/md";
export enum AlertTypes {
  danger = "alertDanger",
  info = "alertInfo",
  success = "alertSuccess",
}
type AlertViewProps = {
  type?: AlertTypes;
  closeAlert: () => void;
};

export const AlertView: React.FC<AlertViewProps> = ({
  type = AlertTypes.info,
  closeAlert,
  children,
}) => {
  return createPortal(
    <div className={`${styles.alert} ${styles[type]}`}>
      {children}
      <MdClose className={styles.alertCloseIcon} onClick={closeAlert} />
    </div>,
    document.getElementById("alert") as Element
  );
};
