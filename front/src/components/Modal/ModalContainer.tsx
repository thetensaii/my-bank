import React from 'react';
import { ModalView } from './ModalView';

type ModalContainerProps = {
    title:string
    showModal:boolean,
    closeModal:() => void
}

export const ModalContainer:React.FC<ModalContainerProps> = ({title, showModal, closeModal, children}) => {
  return <ModalView title={title} showModal={showModal} closeModal={closeModal}>
    { children }
  </ModalView>;
};
