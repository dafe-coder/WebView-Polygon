import React from 'react'
import ReactApexChart from 'react-apexcharts'
import cn from 'classnames'
import MyLoader from '../Loader/Loader'

const ApexChart = ({ setBtnsOut, loadingChar, setWidth, state, width }) => {
	const onCharClick = () => {
		setWidth(!width)
		setBtnsOut((state) => !state)
	}
	return (
		<div
			id='chart'
			className={cn({
				['active-char']: width == true,
			})}>
			{loadingChar == true ? (
				<MyLoader />
			) : (
				<ReactApexChart
					style={
						width
							? {
									marginLeft: '-25px',
									marginRight: '-25px',
									width: '400px',
									backgroundColor: 'white',
									transition: 'all ease .5s',
							  }
							: {
									transition: 'all ease .5s',
									width: '210px',
							  }
					}
					onClick={onCharClick}
					options={state.options}
					series={state.series}
					type='donut'
				/>
			)}
		</div>
	)
}
export default ApexChart
