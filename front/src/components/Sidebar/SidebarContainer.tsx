import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'redux/selectors/userSelectors';
import { UserProps } from 'utils/props/UserProps';
import { SidebarView } from './SidebarView'; 
import { FaHome, FaCreditCard, FaMoneyBillAlt } from 'react-icons/fa'
import { PATHS } from 'routes/constants'
import { useLocation } from 'react-router-dom';

type SidebarContainerProps = {
}

export const SidebarContainer:React.FC<SidebarContainerProps> = () => {
    const user:UserProps|null = useSelector(userSelector);
    const location = useLocation();

    return <SidebarView user={user!} navLinkItems={navLinkItems} actualPath={location.pathname} />;
};

export type navLinkItem = {
    text : string,
    path : string,
    icon : any
}

const navLinkItems:navLinkItem[] = [
    {
        text : 'Accueil',
        path : PATHS.ROOT,
        icon : <FaHome />
    },
    {
        text : 'Comptes',
        path : PATHS.ACCOUNTS,
        icon : <FaCreditCard />
    },
    {
        text : 'Transactions',
        path : PATHS.TRANSACTIONS,
        icon : <FaMoneyBillAlt />
    }

]