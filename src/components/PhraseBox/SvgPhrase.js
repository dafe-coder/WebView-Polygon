import React from 'react'
const SvgShowPass = ({ type }) => {
	switch (type) {
		case 'copy':
			return (
				<svg
					className='copy'
					width='15'
					height='15'
					viewBox='0 0 15 15'
					fill='#06040D'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M8.4375 12.125C8.19141 12.125 8 12.3438 8 12.5625V13C8 13.4922 7.58984 13.875 7.125 13.875H2.75C2.25781 13.875 1.875 13.4922 1.875 13V6C1.875 5.53516 2.25781 5.125 2.75 5.125H5.8125C6.03125 5.125 6.25 4.93359 6.25 4.6875C6.25 4.46875 6.03125 4.25 5.8125 4.25H2.72266C1.76562 4.25 0.972656 5.04297 0.972656 6L1 13C1 13.9844 1.76562 14.75 2.75 14.75H7.125C8.08203 14.75 8.875 13.9844 8.875 13V12.5625C8.875 12.3438 8.65625 12.125 8.4375 12.125ZM14.7266 3.12891L12.6211 1.02344C12.457 0.859375 12.2383 0.75 11.9922 0.75H8.875C7.89062 0.75 7.125 1.54297 7.125 2.5V9.5C7.125 10.4844 7.89062 11.25 8.875 11.25H13.25C14.207 11.25 15 10.4844 15 9.5V3.75781C15 3.51172 14.8906 3.29297 14.7266 3.12891ZM12.375 2.00781L13.7422 3.375H12.375V2.00781ZM14.125 9.5C14.125 9.99219 13.7148 10.375 13.25 10.375H8.875C8.38281 10.375 8 9.99219 8 9.5V2.5C8 2.03516 8.38281 1.625 8.875 1.625H11.5V3.375C11.5 3.86719 11.8828 4.25 12.375 4.25H14.125V9.5Z' />
				</svg>
			)
		case 'check':
			return (
				<svg
					width='14'
					height='10'
					viewBox='0 0 14 10'
					fill='#23AC00'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M12.7266 0.648438C13.082 0.976562 13.082 1.55078 12.7266 1.87891L5.72656 8.87891C5.39844 9.23438 4.82422 9.23438 4.49609 8.87891L0.996094 5.37891C0.640625 5.05078 0.640625 4.47656 0.996094 4.14844C1.32422 3.79297 1.89844 3.79297 2.22656 4.14844L5.09766 7.01953L11.4961 0.648438C11.8242 0.292969 12.3984 0.292969 12.7266 0.648438Z' />
				</svg>
			)
		case 'qrCode':
			return (
				<svg
					width='13'
					height='14'
					viewBox='0 0 13 14'
					fill='#06040D'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M2.84375 2.59375C3.0625 2.59375 3.28125 2.8125 3.28125 3.03125V3.46875C3.28125 3.71484 3.0625 3.90625 2.84375 3.90625H2.40625C2.16016 3.90625 1.96875 3.71484 1.96875 3.46875V3.03125C1.96875 2.8125 2.16016 2.59375 2.40625 2.59375H2.84375ZM3.9375 0.625C4.64844 0.625 5.25 1.22656 5.25 1.9375V4.5625C5.25 5.30078 4.64844 5.875 3.9375 5.875H1.3125C0.574219 5.875 0 5.30078 0 4.5625V1.9375C0 1.22656 0.574219 0.625 1.3125 0.625H3.9375ZM3.9375 1.5H1.3125C1.06641 1.5 0.875 1.71875 0.875 1.9375V4.5625C0.875 4.80859 1.06641 5 1.3125 5H3.9375C4.15625 5 4.375 4.80859 4.375 4.5625V1.9375C4.375 1.71875 4.15625 1.5 3.9375 1.5ZM1.96875 10.0312C1.96875 9.8125 2.16016 9.59375 2.40625 9.59375H2.84375C3.0625 9.59375 3.28125 9.8125 3.28125 10.0312V10.4688C3.28125 10.7148 3.0625 10.9062 2.84375 10.9062H2.40625C2.16016 10.9062 1.96875 10.7148 1.96875 10.4688V10.0312ZM3.9375 7.625C4.64844 7.625 5.25 8.22656 5.25 8.9375V11.5625C5.25 12.3008 4.64844 12.875 3.9375 12.875H1.3125C0.574219 12.875 0 12.3008 0 11.5625V8.9375C0 8.22656 0.574219 7.625 1.3125 7.625H3.9375ZM3.9375 8.5H1.3125C1.06641 8.5 0.875 8.71875 0.875 8.9375V11.5625C0.875 11.8086 1.06641 12 1.3125 12H3.9375C4.15625 12 4.375 11.8086 4.375 11.5625V8.9375C4.375 8.71875 4.15625 8.5 3.9375 8.5ZM9.84375 2.59375C10.0625 2.59375 10.2812 2.8125 10.2812 3.03125V3.46875C10.2812 3.71484 10.0625 3.90625 9.84375 3.90625H9.40625C9.16016 3.90625 8.96875 3.71484 8.96875 3.46875V3.03125C8.96875 2.8125 9.16016 2.59375 9.40625 2.59375H9.84375ZM7 1.9375C7 1.22656 7.57422 0.625 8.3125 0.625H10.9375C11.6484 0.625 12.25 1.22656 12.25 1.9375V4.5625C12.25 5.30078 11.6484 5.875 10.9375 5.875H8.3125C7.57422 5.875 7 5.30078 7 4.5625V1.9375ZM7.875 1.9375V4.5625C7.875 4.80859 8.06641 5 8.3125 5H10.9375C11.1562 5 11.375 4.80859 11.375 4.5625V1.9375C11.375 1.71875 11.1562 1.5 10.9375 1.5H8.3125C8.06641 1.5 7.875 1.71875 7.875 1.9375ZM7 8.0625C7 7.84375 7.19141 7.625 7.4375 7.625H9.1875C9.40625 7.625 9.625 7.84375 9.625 8.0625V9.92188H11.375V8.0625C11.375 7.84375 11.5664 7.625 11.8125 7.625C12.0312 7.625 12.25 7.84375 12.25 8.0625V10.3594C12.25 10.6055 12.0312 10.7969 11.8125 10.7969H9.1875C8.94141 10.7969 8.75 10.6055 8.75 10.3594V8.5H7.875V12.6562C7.875 12.9023 7.65625 13.0938 7.4375 13.0938C7.19141 13.0938 7 12.9023 7 12.6562V8.0625ZM8.75 12C8.75 11.7812 8.94141 11.5625 9.1875 11.5625H9.625C9.84375 11.5625 10.0625 11.7812 10.0625 12V12.4375C10.0625 12.6836 9.84375 12.875 9.625 12.875H9.1875C8.94141 12.875 8.75 12.6836 8.75 12.4375V12ZM11.8125 11.5625C12.0312 11.5625 12.25 11.7812 12.25 12V12.4375C12.25 12.6836 12.0312 12.875 11.8125 12.875H11.375C11.1289 12.875 10.9375 12.6836 10.9375 12.4375V12C10.9375 11.7812 11.1289 11.5625 11.375 11.5625H11.8125Z' />
				</svg>
			)
		default:
			return <></>
	}
}
export default SvgShowPass