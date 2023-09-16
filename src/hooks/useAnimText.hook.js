import React, { useEffect, useState } from 'react';

export const useAnimatedText = (text, speed) => {
	const [currentPosition, setCurrentPosition] = useState(0);

	useEffect(() => {
		const textInterval = setInterval(() => {
			setCurrentPosition((state) => {
				const isLast = state === text.length - 1;
				return isLast ? 0 : state + 1;
			});
		}, speed);
		return () => {
			clearInterval(textInterval);
		};
	}, [text, speed]);

	return <>{text.length ? text.substring(0, currentPosition) : ''}</>;
};
