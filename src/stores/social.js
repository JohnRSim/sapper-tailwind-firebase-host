import { writable } from 'svelte/store';

//states
const defaultState = {
    activeLogin: '',
    //supportedNetworks: ['Twitter','Google','Facebook','Github'],
	_rehydrated: false,
};

const { subscribe, update } = writable(defaultState);

export default { subscribe, update };