import React from 'react'
import styles from '../../Form.module.css'
type TextAreaProps = {
    name: string,
    label: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextArea:React.FC<TextAreaProps> = ({name, label, ...rest}) => {
  return (
    <div className={styles.formControl}>
        <label htmlFor={name} className={styles.label}>{label}</label>
        <textarea id={name} name={name} className={styles.textArea} {...rest}></textarea>
    </div>
  )
}
