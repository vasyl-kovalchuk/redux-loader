import {COMPLETE_LOADING, START_LOADING, Status} from './constants';
import {ILoaderPayloadAction} from "./types";

export const createPayloadAction = (actionAlias: string, payload?: ILoaderPayloadAction) => ({
	type: actionAlias,
	payload
});

export const load = (promise: Promise<any>, payloadOptions?: ILoaderPayloadAction) => (dispatch) => {
	if (promise && typeof promise.then == 'function') {
		dispatch(createPayloadAction(START_LOADING, payloadOptions));
		promise.then((result) => {
			dispatch(createPayloadAction(COMPLETE_LOADING, {
				status: Status.SUCCESS
			}));
			// propagate result to make a chain of promises
			return result;
		}, (e) => {
			dispatch(createPayloadAction(COMPLETE_LOADING, {
				status: Status.ERROR,
				statusMessage: e.message
			}))
		})
	}
};
