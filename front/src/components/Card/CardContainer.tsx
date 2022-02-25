import React from 'react';
import { CardView } from './CardView'

type CardContainerProps = {
  title:string
}

export const CardContainer:React.FC<CardContainerProps> = ({ title, children}) => {
  return <CardView title={title}>
      {children}
  </CardView>;
};
