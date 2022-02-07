import React from 'react';
import { Link } from 'react-router-dom';
import {FaRegUserCircle} from 'react-icons/fa'
import { VscSignOut } from 'react-icons/vsc'
import { UserProps } from 'utils/props/UserProps';
import { navLinkItem } from './SidebarContainer';
import styles from './Sidebar.module.css'

export enum LoggedInPages {
  HOME = "home",
  ACCOUNTS = "accounts",
  TRANSACTIONS = "transactions"
}

type SidebarViewProps = {
  user:UserProps|null,
  navLinkItems : navLinkItem[],
  actualPath:string,
  signOutIconClick:() => void
}

export const SidebarView:React.FC<SidebarViewProps> = ({user, navLinkItems, actualPath, signOutIconClick}) => {
  return <div className={styles.sidebar}>
    <div className={styles.profileLink}>
      <FaRegUserCircle size={56}/>
      <span className={styles.profileText}>{user?.firstname} {user?.lastname.toUpperCase()}</span>
    </div>
    <div className={styles.navLinkList}>
    {navLinkItems.map((item, idx) => { 
      return (
          <Link key={idx} to={item.path} className={`${styles.navLinkItem} ${actualPath === item.path ? styles.navLinkItemActive : ''}`}>
              <span className={styles.navLinkItemIcon}>{item.icon}</span>
              <span className={styles.navLinkItemText}>{item.text}</span>
          </Link>
      )
    })}
    </div>
    <VscSignOut className={styles.signOutIcon} onClick={signOutIconClick}/>
  </div>;
};
