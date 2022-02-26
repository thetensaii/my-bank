import React from 'react';
import styles from './Header.module.css'

type HeaderViewProps = {
    title:string,
    buttonText?:string,
    buttonOnClick?:(e: React.MouseEvent<HTMLButtonElement>) => void

}

export const HeaderView:React.FC<HeaderViewProps> = ({ title, buttonText, buttonOnClick }) => {
  return <div className={styles.header}>
      <h1 className={styles.title}>{title.toUpperCase()}</h1>
      {buttonText ? 
        <button className={styles.button} onClick={buttonOnClick}>{buttonText.toUpperCase()}</button> : 
        
        <div></div>// Add empty div so that title stay at the same place with space-around in css
      }
  </div>
};
