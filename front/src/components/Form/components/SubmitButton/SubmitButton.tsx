import React from 'react'
import styles from '../../Form.module.css'
type SubmitButtonProps = {

}

export const SubmitButton:React.FC<SubmitButtonProps> = ({children}) => {
  return (
    <button className={styles.submitButton} type='submit'>
        {children}
    </button>
  )
}
