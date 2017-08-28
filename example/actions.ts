import * as constants from "./constants";
import {UserStoreState} from "./types";

export interface LoadUserData {
    type: constants.LOAD_USER_DATA;
    payload: UserStoreState
}

export type LoadUserDataAction = LoadUserData;
