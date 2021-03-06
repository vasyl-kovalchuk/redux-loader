import {Status} from "./constants";

export interface ILoaderState {
    status?: Status;
    statusMessage?: string;
}

export interface StateStore {
    loader: ILoaderState
}

export interface ILoaderPayloadAction extends ILoaderState {
    alias?: string // identifier of content which wraps
}

export interface ILoaderAction {
    type: string,
    payload: ILoaderPayloadAction
}