import {COMPLETE_LOADING, START_LOADING, Status} from './constants';
import {ILoaderPayloadAction} from "./types";

export const createPayloadAction = (type: string, payload?: ILoaderPayloadAction) => ({
	type: type,
	payload
});

export const startLoadingAction = (payloadOptions?: ILoaderPayloadAction)=>createPayloadAction(START_LOADING, payloadOptions);

export const completeLoadingAction = (payloadOptions?: ILoaderPayloadAction)=>createPayloadAction(COMPLETE_LOADING, payloadOptions);