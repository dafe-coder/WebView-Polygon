import React from 'react'
import ContentLoader from 'react-content-loader'

const MyLoader = (props) => (
	<ContentLoader
		speed={2}
		width={135}
		height={135}
		viewBox='0 0 135 135'
		backgroundColor='#e3e3e3'
		foregroundColor='#ecebeb'
		{...props}>
		<circle cx='67' cy='67' r='67' />
	</ContentLoader>
)
export default MyLoader
