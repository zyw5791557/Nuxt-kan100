import * as types from './mutation-types';

const mutations = {
	[types.SET_PLAY_SOURCE] (state, item) {
		state.play_source = { ...item };
	}
};


export default mutations;