import React from 'react'
import styles from './Link.module.css'

const Link = ({ href, title }) => {
	return (
		<a className={styles.a} href={href ? href : '!#'}>
			{title}
		</a>
	)
}

export default Link
