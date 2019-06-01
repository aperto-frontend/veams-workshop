import { combineReducers, createStore } from '@veams/rx-store';
import { audioReducer, INITIAL_AUDIO_STATE } from './features/audio/store';


const INITIAL_STATE = {
	audio: INITIAL_AUDIO_STATE
};

const rootReducer = combineReducers({
	audio: audioReducer
});

createStore(rootReducer, INITIAL_STATE, {
	devtools: true
});
