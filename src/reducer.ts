import { Status, START_LOADING, COMPLETE_LOADING } from './constants';
import { ILoaderState } from './types';

const initialState: ILoaderState = {
	label: null,
	status: Status.NONE,
	statusMessage: null
};

export function reducer(state = initialState, action): ILoaderState {
	let {type, payload} = action;
	switch (type) {
	case START_LOADING:
		return {...state, status: Status.PROGRESS, ...payload};
	case COMPLETE_LOADING:
		return {...state, ...payload};
	default:
		return state;
	}
}
