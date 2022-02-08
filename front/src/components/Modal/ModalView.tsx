import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md'

import styles from './Modal.module.css'
type ModalViewProps = {
    title:string,
    showModal:boolean,
    closeModal:() => void
}

export const ModalView:React.FC<ModalViewProps> = ({title, showModal, closeModal, children}) => {
  const modalBackgroundRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = (e:React.MouseEvent<HTMLDivElement>) => {
    if(e.target === modalBackgroundRef.current){
      closeModal()
    }
  }

  return createPortal(
    showModal ?
      <div className={styles.modalBackground} onClick={handleCloseModal} ref={modalBackgroundRef}>
          <div className={styles.modalCard}>
            <MdClose className={styles.modalCloseButton} onClick={() => closeModal()}/>
            <h1 className={styles.modalTitle}>{title}</h1>
            <hr />
            { children }
          </div>
      </div> :
      null, 
      document.getElementById('modal') as Element
  );
};
