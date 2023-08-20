import React from 'react'
import ContentLoader from 'react-content-loader'

const LoaderCard = (props) => (
	<ContentLoader
		speed={2}
		width={270}
		height={90}
		viewBox='0 0 270 90'
		backgroundColor='#2F4925'
		foregroundColor='#5E9F53'
		{...props}>
		<rect x='23' y='156' rx='0' ry='0' width='117' height='10' />
		<rect x='8' y='194' rx='0' ry='0' width='200' height='10' />
		<rect x='248' y='194' rx='0' ry='0' width='71' height='10' />
		<rect x='34' y='243' rx='0' ry='0' width='117' height='10' />
		<rect x='31' y='277' rx='0' ry='0' width='200' height='10' />
		<rect x='5' y='237' rx='0' ry='0' width='21' height='22' />
		<rect x='244' y='276' rx='0' ry='0' width='71' height='10' />
		<rect x='182' y='155' rx='0' ry='0' width='126' height='9' />
		<rect x='193' y='242' rx='0' ry='0' width='126' height='9' />
		<rect x='2' y='4' rx='0' ry='0' width='104' height='13' />
		<rect x='98' y='37' rx='0' ry='0' width='3' height='1' />
		<rect x='2' y='79' rx='0' ry='0' width='73' height='11' />
		<rect x='83' y='79' rx='0' ry='0' width='30' height='11' />
		<rect x='0' y='40' rx='0' ry='0' width='298' height='13' />
	</ContentLoader>
)

export default LoaderCard
