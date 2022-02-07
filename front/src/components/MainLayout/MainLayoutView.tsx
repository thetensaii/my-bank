import Sidebar from 'components/Sidebar';
import React from 'react';
import { UserProps } from 'utils/props/UserProps';
import styles from './MainLayout.module.css'

type MainLayoutViewProps = {
    user: UserProps
}

export const MainLayoutView:React.FC<MainLayoutViewProps> = ({user, children}) => {
  return <>
        <div className={styles.mainLayout}>
            <Sidebar/>
            {children}
        </div>
  </>
};
