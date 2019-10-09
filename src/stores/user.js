import { writable } from 'svelte/store';

//states
const defaultState = {
	displayName: '',
	userName: '',
	profileImg: '',
	_rehydrated: false,
};

const { subscribe, update } = writable(defaultState);

function doUpdate() {
	update(currentState => {
		const state = {...currentState, counter: currentState.counter + 1, _rehydrated: true};
		console.log('NOW state', state);
		return state;
	});
}


export default { subscribe, update };