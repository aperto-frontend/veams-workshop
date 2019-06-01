import Veams from '@veams/core';
import ModulesPlugin from '@veams/plugin-modules';
import MediaQueryPlugin from '@veams/plugin-media-query-handler';
import VentPlugin from '@veams/plugin-vent';

Veams.onInitialize(() => {
	Veams.use(VentPlugin, {
		furtherEvents: {
			custom: 'custom:event'
		}
	});

	Veams.use(ModulesPlugin, {
		useMutationObserver: true
	});

	Veams.use(MediaQueryPlugin);

	console.log('Veams is initialized!');
});

export { Veams };
