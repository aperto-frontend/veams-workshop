import Component from '@veams/component';
import $ from '@veams/query';

const options = {
	selectors: {
		counter: `[data-js-item="counter-count"]`
	}
};

export default class CounterComponent extends Component {
	constructor(obj) {
		super(obj, options);
	}

	$counter = $(this.options.selectors.counter, this.el);

	render(count = 0) {
		this.$counter.html(count.toString());

		return this;
	}
}
