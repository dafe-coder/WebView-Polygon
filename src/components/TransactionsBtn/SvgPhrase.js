import React from 'react'
const SvgTransactions = ({ type }) => {
	switch (type) {
		case 'arr-top':
			return (
				<svg
					width='9'
					height='10'
					viewBox='0 0 9 10'
					fill='#009393'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M9 1.03125V7.59375C9 7.97656 8.69922 8.25 8.34375 8.25C7.96094 8.25 7.6875 7.97656 7.6875 7.59375V2.61719L1.37109 8.93359C1.23438 9.07031 1.07031 9.125 0.90625 9.125C0.714844 9.125 0.550781 9.07031 0.441406 8.93359C0.167969 8.6875 0.167969 8.27734 0.441406 8.03125L6.75781 1.6875H1.78125C1.39844 1.6875 1.125 1.41406 1.125 1.03125C1.125 0.675781 1.39844 0.375 1.78125 0.375H8.34375C8.69922 0.375 9 0.675781 9 1.03125Z' />
				</svg>
			)
		case 'arr-bottom':
			return (
				<svg
					width='10'
					height='10'
					viewBox='0 0 10 10'
					fill='#009393'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M8.78125 1.49609L2.46484 7.8125H7.46875C7.82422 7.8125 8.125 8.11328 8.125 8.46875C8.125 8.85156 7.82422 9.125 7.46875 9.125H0.90625C0.523438 9.125 0.25 8.85156 0.25 8.46875V1.90625C0.25 1.55078 0.523438 1.25 0.90625 1.25C1.26172 1.25 1.5625 1.55078 1.5625 1.90625V6.91016L7.87891 0.59375C8.125 0.320312 8.53516 0.320312 8.78125 0.59375C9.05469 0.839844 9.05469 1.25 8.78125 1.49609Z' />
				</svg>
			)
		case 'swap':
			return (
				<svg
					width='16'
					height='15'
					viewBox='0 0 16 15'
					fill='#009393'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M14.3438 10.1562H3.16016L5.18359 7.99609C5.42969 7.72266 5.42969 7.3125 5.15625 7.06641C4.88281 6.82031 4.47266 6.82031 4.22656 7.09375L1.16406 10.375C0.917969 10.6211 0.917969 11.0312 1.16406 11.2773L4.22656 14.5586C4.36328 14.6953 4.52734 14.75 4.71875 14.75C4.85547 14.75 5.01953 14.6953 5.15625 14.5859C5.42969 14.3398 5.42969 13.9297 5.18359 13.6562L3.16016 11.4688H14.3438C14.6992 11.4688 15 11.1953 15 10.8125C15 10.457 14.6992 10.1562 14.3438 10.1562ZM1.65625 5.34375H12.8125L10.7891 7.53125C10.543 7.80469 10.543 8.21484 10.8164 8.46094C11.0898 8.70703 11.5 8.70703 11.7461 8.43359L14.8086 5.15234C15.0547 4.90625 15.0547 4.49609 14.8086 4.25L11.7461 0.96875C11.6094 0.832031 11.4453 0.75 11.2812 0.75C11.1172 0.75 10.9531 0.832031 10.8164 0.941406C10.543 1.1875 10.543 1.59766 10.7891 1.87109L12.8125 4.03125H1.65625C1.27344 4.03125 1 4.33203 1 4.6875C1 5.07031 1.27344 5.34375 1.65625 5.34375Z' />
				</svg>
			)
		default:
			return <></>
	}
}
export default SvgTransactions
