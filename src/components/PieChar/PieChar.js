import React from 'react'
import ReactApexChart from 'react-apexcharts'
import cn from 'classnames'
import MyLoader from '../Loader/Loader'
import { setDataLabels, setDataPrices } from '../../store/slices/walletSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setLabelCurrency } from '../../Func.wallet/labelCurrency';

const ApexChart = ({setBtnsOut, data}) => {
	const {dataPrices, dataLabels, currencyPrice, dataWallet} = useSelector(state => state.wallet)
	const {currencyWallet} = useSelector(state => state.storage)
	const dispatch = useDispatch()
	const [state, setState] = React.useState(null)
	const [width, setWidth] = React.useState(false)

	const onCharClick = () => {
		setWidth(!width)
		setBtnsOut((state) => !state)
		setState(null)
	}

	const onPieCharLoaded = (list) => {
		const arr = []
		const arrPrice = []
		if (list.length) {
			let sortedArr = list.sort(function (a, b) {
				if (
					a.market_data.balance > b.market_data.balance
				) {
					return -1
				}
				if (
					a.market_data.balance < b.market_data.balance
				) {
					return 1
				}
				return 0
			})
			if (sortedArr.length) {
				sortedArr.forEach((item) => {
					arr.push(item.symbol)
					arrPrice.push(
						+Number(item.market_data.balance_crypto) > 0
							? +Number(item.market_data.balance_crypto).toFixed(15)
							: 0.00000001
					)
				})
			}
		} else {
			arr.push('ETH', 'WBTC', 'MATIC', 'USD')
			arrPrice.push(0.00000001, 0.00000001, 0.00000001, 0.00000001)
		}
		dispatch(setDataLabels(arr))
		dispatch(setDataPrices(arrPrice))
	}

	React.useEffect(() => {
		if(data.length) {
			onPieCharLoaded(data)
		}
	}, [data])

	React.useEffect(() => {
		if(dataLabels.length && dataPrices.length && currencyPrice !== null) {
			setState({
				series: dataPrices,
				options: {
					labels: dataLabels,
					responsive: [
						{
							breakpoint: 480,
							options: {
								chart: {
									width: width ? 348 : 210,
								},
							},
						},
					],
					tooltip: {
						custom: function ({ seriesIndex, w }) {
							return `<div
									className='arrow_box'
									style='background-color:${w.globals.colors[seriesIndex]}; padding: 5px; font-size: 10px;'>
									<span>
										${w.globals.labels[seriesIndex]}
									</span>
								</div>`
						},
					},
					plotOptions: {
						pie: {
							expandOnClick: false,
							offsetX: 0,
							offsetY: 0,
							customScale: 1,
							dataLabels: {
								show: false,
								offset: 10,
								minAngleToShowLabel: 100,
							},
							donut: {
								size: '83%',
								labels: {
									show: true,
									name: {
										show: false,
									},
									value: {
										show: true,
										fontFamily: 'Inter',
										fontSize: '20px',
										fontWeight: 600,
										color: '#06040D',
										formatter:
											currencyPrice != null
												? function (val) {
														return `${setLabelCurrency(currencyPrice, currencyWallet)}${(
															val * currencyPrice
														).toFixed(2)}`
												  }
												: () => console.log('err'),
									},
									total: {
										show: true,
										formatter:
											currencyPrice != null
												? function (w) {
														let price = w.globals.seriesTotals.reduce((a, b) => {
															return +Number(a + b).toFixed(2)
														}, 0)
														return (
															setLabelCurrency(currencyPrice, currencyWallet) +
															(price * currencyPrice).toFixed(2)
														)
												  }
												: () => console.log('err'),
									},
								},
							},
						},
					},
					dataLabels: {
						enabled: false,
					},
					legend: {
						show: width ? true : false,
						offsetY: -17,
						offsetX: -10,
						position: 'right',
						formatter: function (seriesName, opts) {
							return [
								seriesName,
								`<span>${Number(
									isNaN(opts.w.globals.seriesPercent[opts.seriesIndex][0])
										? 0
										: opts.w.globals.seriesPercent[opts.seriesIndex][0]
								).toFixed(0)}%</span>`,
								,
							]
						},
						markers: {
							width: 4,
							height: 4,
							offsetX: -5,
							offsetY: 0,
						},
						onItemClick: {
							toggleDataSeries: false,
						},
						fontFamily: 'Inter',
						textTransform: 'uppercase',
						fontSize: '14px',
						itemMargin: {
							vertical: 7,
						},
					},
				},
			})
		} else {
			setState(null)
		}
	}, [dataLabels, dataPrices, width, currencyWallet, currencyPrice])

	return (
		<div
			onClick={onCharClick}
			id='chart'
			className={cn({
				['active-char']: width,
			})}>
			{state !== null && dataWallet !== null ? (
				<ReactApexChart
					style={
						width
							? {
									marginLeft: '-25px',
									marginRight: '-25px',
									width: '340px',
									backgroundColor: 'white',
									transition: 'all ease .5s',
							  }
							: {
									transition: 'all ease .5s',
									width: '210px',
							  }
					}
					options={state.options}
					series={state.series}
					type='donut'
				/>
			) : (
				<MyLoader />
			)}
		</div>
	)
}
export default ApexChart
