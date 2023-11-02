import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import RouterWrap from './navigation/navigation';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

const App = () => {
	const particlesInit = React.useCallback(async (engine) => {
		console.log(engine);
		// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		//await loadFull(engine);
		await loadSlim(engine);
	}, []);

	const particlesLoaded = React.useCallback(async (container) => {
		await console.log(container);
	}, []);

	return (
		// <React.StrictMode>
		<Provider store={store}>
			<Particles
				id='tsparticles'
				init={particlesInit}
				loaded={particlesLoaded}
				options={{
					background: {
						color: {
							value: 'transparent',
						},
					},
					fpsLimit: 120,
					interactivity: {
						events: {
							resize: true,
						},
						modes: {
							push: {
								quantity: 4,
							},
							repulse: {
								distance: 200,
								duration: 0.4,
							},
						},
					},
					particles: {
						color: {
							value: '#ffffff',
						},
						links: {
							color: '#ffffff',
							distance: 150,
							enable: true,
							opacity: 0.5,
							width: 1,
						},
						move: {
							direction: 'none',
							enable: true,
							outModes: {
								default: 'bounce',
							},
							random: false,
							speed: 1.5,
							straight: false,
						},
						number: {
							density: {
								enable: true,
								area: 800,
							},
							value: 80,
						},
						opacity: {
							value: 0.5,
						},
						shape: {
							type: 'circle',
						},
						size: {
							value: { min: 1, max: 5 },
						},
					},
					detectRetina: true,
				}}
			/>
			<div className='page'>
				<RouterWrap />
			</div>
		</Provider>
		// </React.StrictMode>
	);
};

const container = document.createElement('div');
container.setAttribute('id', 'app');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
