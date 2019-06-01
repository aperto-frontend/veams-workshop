/**
 * Description of EngineSounds.
 * Class properties and decorators are supported.
 *
 * @module EngineSounds
 * @version v1.0.0
 *
 * @author your_name
 */

// Imports
import Component from '@veams/component';
import $ from '@veams/query';

const options = {
	classes: {},
	selectors: {
		buttons: '[data-js-item="engine-sounds-cta"]',
		isPlaying: 'is-playing',
		item: '[data-js-item="engine-sounds-item"]',
		sound: '[data-js-item="engine-sounds-file"]'
	}
};

class EngineSounds extends Component {
	/**
	 * Class Properties
	 */
	$el = $(this.el);
	$sounds = this.$el.find(this.options.selectors.sound);
	$buttons = this.$el.find(this.options.selectors.buttons);

	/**
	 * Constructor for our class
	 *
	 * @see module.js
	 *
	 * @param {Object} obj - Object which is passed to our class
	 * @param {Object} obj.el - element which will be saved in this.el
	 * @param {Object} obj.options - options which will be passed in as JSON object
	 */
	constructor(obj) {
		super(obj, options);
	}

	/**
	 * Bind global and local events
	 *
	 */
	get events() {
		return {
			'click {{this.options.selectors.buttons}}': 'handleClick'
		};
	}

	/**
	 * Bind events
	 */
	bindEvents() {
		for (let i = 0; i < this.$sounds.length; i++) {
			this.$sounds[i].onended = () => {
				this.removePlayClass(i);
			};
		}
	}

	/**
	 * Render class
	 */
	render() {
		return this;
	}

	removePlayClass(key) {
		if ($(this.$buttons[key]).hasClass(this.options.selectors.isPlaying)) {
			$(this.$buttons[key]).removeClass(this.options.selectors.isPlaying);
		}
	}

	stopPlayback() {
		for (let i = 0; i < this.$sounds.length; i++) {
			this.$sounds[i].pause();
			this.$sounds[i].currentTime = 0;
			this.removePlayClass(i);
		}
	}

	togglePlay($target, $sound) {
		if (!$target.hasClass(this.options.selectors.isPlaying)) {
			this.stopPlayback();
			$sound.play();
			$target.addClass(this.options.selectors.isPlaying);
		} else {
			$sound.pause();
			$sound.currentTime = 0;
			$target.removeClass(this.options.selectors.isPlaying);
		}

		if ($sound.ended) {
			if ($target.hasClass(this.options.selectors.isPlaying)) {
				$target.removeClass(this.options.selectors.isPlaying);
			}
		}
	}

	handleClick(e, currentTarget) {
		const $currentTarget = $(currentTarget);
		const $sound = $currentTarget
			.closest(this.options.selectors.item)
			.find(this.options.selectors.sound);

		this.togglePlay($currentTarget, $sound[0]);
	}
}

export default EngineSounds;
