import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "universal-cookie"
import { userSelector } from 'redux/selectors/userSelectors';
import { UserProps } from 'utils/props/UserProps';
import { SidebarView } from './SidebarView'; 
import { FaHome, FaCreditCard, FaMoneyBillAlt } from 'react-icons/fa'
import { PATHS } from 'routes/constants'
import { useHistory, useLocation } from 'react-router-dom';
import { apiBackRequest } from 'utils/api'
import { unsetUserAction } from 'redux/actions/userActions';
import config from 'config'

type SidebarContainerProps = {
}

export const SidebarContainer:React.FC<SidebarContainerProps> = () => {
    const user:UserProps|null = useSelector(userSelector);
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();

    const [profileModal, setProfileModal] = useState<boolean>(false);

    const signOutIconClick = async () => {
        const cookies = new Cookies();

        await apiBackRequest("/auth/disconnect");
        cookies.remove(config.AUTH_TOKEN);
        dispatch(unsetUserAction());

        history.push('/');
    }

    return <SidebarView 
                user={user!} 
                navLinkItems={navLinkItems} 
                actualPath={location.pathname} 
                signOutIconClick={signOutIconClick}
                isProfileModalActive={profileModal}
                setProfileModal={setProfileModal}
    />
};

export type navLinkItem = {
    text : string,
    path : string,
    icon : JSX.Element
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