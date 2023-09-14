import React from 'react';
import ContentLoader from 'react-content-loader';

const LoaderList = (props) => (
	<ContentLoader
		speed={2}
		width={325}
		height={270}
		viewBox='0 0 325 270'
		backgroundColor='#2F4925'
		foregroundColor='var(--dark-text)'
		{...props}
	>
		<rect x='34' y='23' rx='0' ry='0' width='117' height='10' />
		<rect x='8' y='56' rx='0' ry='0' width='200' height='10' />
		<rect x='5' y='17' rx='0' ry='0' width='21' height='22' />
		<rect x='194' y='24' rx='0' ry='0' width='126' height='9' />
		<rect x='249' y='56' rx='0' ry='0' width='71' height='10' />
		<rect x='34' y='97' rx='0' ry='0' width='117' height='10' />
		<rect x='8' y='130' rx='0' ry='0' width='200' height='10' />
		<rect x='5' y='91' rx='0' ry='0' width='21' height='22' />
		<rect x='248' y='130' rx='0' ry='0' width='71' height='10' />
		<rect x='34' y='169' rx='0' ry='0' width='117' height='10' />
		<rect x='8' y='202' rx='0' ry='0' width='200' height='10' />
		<rect x='5' y='163' rx='0' ry='0' width='21' height='22' />
		<rect x='248' y='202' rx='0' ry='0' width='71' height='10' />
		<rect x='34' y='243' rx='0' ry='0' width='117' height='10' />
		<rect x='31' y='277' rx='0' ry='0' width='200' height='10' />
		<rect x='5' y='237' rx='0' ry='0' width='21' height='22' />
		<rect x='244' y='276' rx='0' ry='0' width='71' height='10' />
		<rect x='195' y='95' rx='0' ry='0' width='126' height='9' />
		<rect x='193' y='168' rx='0' ry='0' width='126' height='9' />
		<rect x='193' y='242' rx='0' ry='0' width='126' height='9' />
	</ContentLoader>
);

export default LoaderList;
