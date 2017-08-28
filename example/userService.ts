import {UserStoreState} from "./types";

/**
 * Mock user data
 * @param userName
 * @returns {Promise<UserStoreState>}
 */
export const getUserByName = async (userName:string):Promise<UserStoreState> => {
    // api call has to be put here. Similar to redux-thunk in action
    return new Promise<UserStoreState>((resolve, reject)=>{
        try {
            setTimeout(()=>{
                resolve({
                    firstName: "Vasyl",
                    secondName: "Kovalchuk",
                    age: 28
                })
            }, 5000)
        } catch(e) {
            reject(e.message)
        }
    });
};
