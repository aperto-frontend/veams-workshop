import * as Actions from './audio.actions';

export default function audioReducer(state, action) {
	switch (action.type) {
		case Actions.AUDIO_PLAY: {
			return handleAudioPlay(state);
		}

		case Actions.AUDIO_PAUSE: {
			return handleAudioPause(state);
		}

		case Actions.AUDIO_COUNT: {
			return handleAudioCount(state, action.payload);
		}

		default: {
			return state;
		}
	}
}

/**
 * State Handlers
 */
function handleAudioPlay(state) {
	return {
		...state, audio: {
			...state.audio,
			play: true
		}
	};
}

function handleAudioPause(state) {
	return {
		...state, audio: {
			...state.audio,
			play: false
		}
	}
}

function handleAudioCount(state, payload) {
	return {
		...state, audio: {
			...state.audio,
			count: payload
		}
	}
}


