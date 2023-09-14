import React from 'react';
import ContentLoader from 'react-content-loader';

const LoaderPrice = (props) => (
	<ContentLoader
		speed={2}
		width={155}
		height={30}
		viewBox='0 0 155 30'
		backgroundColor='#2F4925'
		foregroundColor='var(--dark-text)'
		{...props}
	>
		<rect x='2' y='5' rx='3' ry='3' width='148' height='19' />
		<rect x='0' y='56' rx='3' ry='3' width='410' height='6' />
		<rect x='0' y='72' rx='3' ry='3' width='380' height='6' />
		<rect x='0' y='88' rx='3' ry='3' width='178' height='6' />
	</ContentLoader>
);
export default LoaderPrice;
