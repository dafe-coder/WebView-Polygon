import React from 'react'
import styles from './allow-data.module.css'
import SwitchButton from '../SwitchButton/SwitchButton'

const AllowData = () => {
	const [active, setActive] = React.useState(true)
	return (
		<div className={styles.body}>
			<div className={styles.info}>
				<h4 className={styles.title}>Allow Data Collection</h4>
				<p className={styles.par}>
					USDT Wallet collects your data to provide you with an improved user
					experience.
				</p>
			</div>
			<div className={styles.btn}>
				<SwitchButton func={setActive} check={active} />
			</div>
		</div>
	)
}
export default AllowData
