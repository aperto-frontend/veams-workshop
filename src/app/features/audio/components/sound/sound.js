import Component, { autocreate } from '@veams/component';
import $ from '@veams/query';
import { store } from '@veams/rx-store';
import { delay, filter } from 'rxjs/operators';
import renderOnChange from '@veams/decorators/lib/render-on-change';
import { audioActions } from '../../store';

// Shared components
import Counter from '../../../../shared/components/counter/counter';

// FE templates (just to show you how easy it is to use it.)
const template = function (playState) {
	return `<div class="sound__in-play-content">Show state: ${playState}</div>`;
};

const areaTpl = function () {
	return `<div class="sound__area" data-js-item="sound-area"></div>`;
};

// General fallback options
const options = {
	classes: {
		play: 'is-playing'
	},
	selectors: {
		btn: `[data-js-item="sound-btn"]`,
		src: `[data-js-item="sound-src"]`,
		renderArea: `[data-js-item="sound-area"]`,
		counter: `[data-js-item="counter"]`
	}
};

class SoundComponent extends Component {
	constructor(obj) {
		super(obj, options);
	}

	// State object, render is executed after state has changed. You can provide another function name as param.
	@renderOnChange()
	state = {
		count: 0,
		play: false
	};

	// Local event handler
	get events() {
		return {
			"click {{this.options.selectors.btn}}": "handleClick"
		};
	}

	// Elements
	$el = $(this.el);
	$btn = $(this.options.selectors.btn, this.el);
	$src = $(this.options.selectors.src, this.el);
	$area = $(this.options.selectors.renderArea, this.el);

	// Sub components
	counter = autocreate()(
		new Counter({
			el: $(this.options.selectors.counter, this.$el)[0]
		})
	);

	// Observables
	audio$ = store.select(state => state.audio);

	// Nodes
	src = this.$src[0];

	// click handler
	handleClick() {
		const action = this.state.play
			? audioActions.audioPause
			: audioActions.audioPlay;

		this.state = {...this.state, count: this.state.count + 1};

		store.dispatch(action());
	}

	willMount() {
		this.audio$
			.pipe(filter(() => this.state.count < 9)) // Just that you can see RxJS in action. 
			.subscribe(({ play }) => {
				this.state = { ...this.state, play };
			});
	}

	// Append necessary template to el to display state text
	preRender() {
		this.$area = $(areaTpl());

		this.$el.append(this.$area);
	}

	// Apply mark-up changes on state change
	render() {
		this.state.play ? this.renderPlay() : this.renderPause();

		this.$area.html(template(this.state.play));
		this.counter.render(this.state.count);

		return this;
	}

	renderPlay() {
		this.$el.addClass(this.options.classes.play).css("background", "red");
		this.src.play();
	}

	renderPause() {
		this.$el
			.removeClass(this.options.classes.play)
			.css("background", "transparent");
		this.src.pause();
	}
}

export default SoundComponent;
