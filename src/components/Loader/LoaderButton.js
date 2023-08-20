import React from 'react'
import ContentLoader from 'react-content-loader'

const LoaderButton = (props) => (
	<ContentLoader
		speed={2}
		width={322}
		height={54}
		viewBox='0 0 322 54'
		backgroundColor='#2F4925'
		foregroundColor='#5E9F53'
		{...props}>
		<rect x='2' y='2' rx='16' ry='16' width='314' height='49' />
		<rect x='0' y='56' rx='3' ry='3' width='410' height='6' />
		<rect x='0' y='72' rx='3' ry='3' width='380' height='6' />
		<rect x='0' y='88' rx='3' ry='3' width='178' height='6' />
	</ContentLoader>
)
export default LoaderButton
