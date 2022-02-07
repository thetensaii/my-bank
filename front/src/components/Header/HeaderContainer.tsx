import React from 'react';
import { HeaderView } from './HeaderView';

type HeaderContainerProps = {
    title:string,
    buttonText?:string,
    buttonOnClick?:(e: React.MouseEvent<HTMLButtonElement>) => void
}

export const HeaderContainer:React.FC<HeaderContainerProps> = ({title, buttonText, buttonOnClick}) => {
  return <HeaderView title={title} buttonText={buttonText} buttonOnClick={buttonOnClick}/>;
};
