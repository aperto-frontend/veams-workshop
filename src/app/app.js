
/**
 * Main entry file for styles.
 */
import './app.scss';

/**
 * Main entry file for application.
 */
import './app.store';
import { Veams } from './app.veams';
import SoundComponent from './features/audio/components/sound/sound';
 
// Initialize modules with Veams
Veams.modules.add({
	namespace: 'sound',
	module: SoundComponent
});

/* @INSERTPOINT :: @ref: js-init-modules-@1, @keep: true */
/* @INSERTPOINT :: @ref: js-init-once, @keep: true */

