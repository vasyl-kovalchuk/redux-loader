
import { LoadUserDataAction } from './actions';
import { UserStoreState } from './types';
import {LOAD_USER_DATA} from "./constants";

export function userProfile(state: UserStoreState, action: LoadUserDataAction): UserStoreState {
    switch (action.type) {
        case LOAD_USER_DATA:
            return { ...state, ...action.payload} as UserStoreState;

        default:
            return state;
    }
}