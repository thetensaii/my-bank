import React from 'react'
import styles from '../../Form.module.css'
type SubmitButtonProps = {

} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const SubmitButton:React.FC<SubmitButtonProps> = ({children, ...props}) => {
  return (
    <button className={styles.submitButton} type='submit' {...props}>
        {children}
    </button>
  )
}
