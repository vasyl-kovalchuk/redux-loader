import {COMPLETE_LOADING, START_LOADING, Status} from "./constants";
import {ILoaderAction, ILoaderState} from "./types";

const initialState: ILoaderState = {
	status: Status.NONE,
	statusMessage: null
};

export function reducer(state: ILoaderState = initialState, action:ILoaderAction) {
	const {type, payload} = action;
	switch (type) {
	case START_LOADING:
		return {...state, status: Status.PROGRESS, ...payload};
	case COMPLETE_LOADING:
		return {...state, ...payload};
	default:
		return state;
	}
}
