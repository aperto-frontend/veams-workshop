export const AUDIO_PLAY = '@my-project-name/audio/play';
export const AUDIO_PAUSE = '@my-project-name/audio/pause';
export const AUDIO_COUNT = '@my-project-name/audio/count';

export function audioPlay() {
	return {
		type: AUDIO_PLAY
	}
}

export function audioPause() {
	return {
		type: AUDIO_PAUSE
	}
}

export function audioCount(payload) {
	return {
		type: AUDIO_COUNT,
		payload
	}
}
