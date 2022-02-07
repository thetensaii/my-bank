import React from 'react';
import { UserProps } from 'utils/props/UserProps';
import {FaRegUserCircle} from 'react-icons/fa'
import styles from './Sidebar.module.css'
import { navLinkItem } from './SidebarContainer';
import { NavLink } from 'react-router-dom';
export enum LoggedInPages {
  HOME = "home",
  ACCOUNTS = "accounts",
  TRANSACTIONS = "transactions"
}

type SidebarViewProps = {
  user:UserProps|null,
  navLinkItems : navLinkItem[],
  actualPath:string
}

export const SidebarView:React.FC<SidebarViewProps> = ({user, navLinkItems, actualPath}) => {
  return <div className={styles.sidebar}>
    <div className={styles.profileLink}>
      <FaRegUserCircle size={56}/>
      <span className={styles.profileText}>{user?.firstname} {user?.lastname.toUpperCase()}</span>
    </div>
    <div className={styles.navLinkList}>
    {navLinkItems.map((item, idx) => { 
      return (
          <NavLink key={idx} to={item.path} className={`${styles.navLinkItem} ${actualPath === item.path ? styles.navLinkItemActive : ''}`}>
              <span className={styles.navLinkItemIcon}>{item.icon }</span>
              <span className={styles.navLinkItemText}>{item.text}</span>
          </NavLink>
      )
    })}
    </div>
  </div>;
};
