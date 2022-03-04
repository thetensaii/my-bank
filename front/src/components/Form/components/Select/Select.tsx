import React from 'react'
import styles from '../../Form.module.css'

type OptionProps = {
	value : string|number,
	label : string
}

type SelectProps = {
	name : string,
	label: string,
	options : OptionProps[]
} & React.SelectHTMLAttributes<HTMLSelectElement>

export const Select:React.FC<SelectProps> = ({name, label, options, ...rest}) => {
  	return (
		<div className={styles.formControl}>
			<label htmlFor={name} className={styles.label}>{label}</label>
			<select id={name} name={name} className={styles.select} {...rest}>
				{options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
			</select>
    	</div>
  	)
}
