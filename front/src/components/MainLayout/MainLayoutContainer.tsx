import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'redux/selectors/userSelectors';
import { UserProps } from 'utils/props/UserProps';
import { MainLayoutView } from './MainLayoutView';

type MainLayoutContainerProps = {

}

export const MainLayoutContainer:React.FC<MainLayoutContainerProps> = ({children}) => {
    const user: UserProps|null = useSelector(userSelector);

  return <MainLayoutView user={user!}>
      {children}
  </MainLayoutView>;
};
