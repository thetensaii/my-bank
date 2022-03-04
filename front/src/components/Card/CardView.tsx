import React from 'react';
import styles from './Card.module.css'
type CardViewProps = {
  title? : string
}

export const CardView:React.FC<CardViewProps> = ({title, children}) => {
  return <div className={styles.card}>
    { title &&
    <>
      <h3 className={styles.cardTitle}>{title}</h3>
      <hr />
    </> 
    }
    {children}
  </div>;
};
