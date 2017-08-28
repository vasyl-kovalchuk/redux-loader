import * as React from "react";
import {UserProfile} from "./UserProfile";
import {connect} from "react-redux";
import {compose} from "redux";
import {UserStoreState} from "./types";
import {loader} from "../src/loader";
import {getUserByName} from "./userService";
import {LOAD_USER_DATA} from "./constants";


const mapStateToProps = ({firstName, secondName, age}:UserStoreState)=>({
    firstName,
    lastName: secondName,
    age
});

export default compose(
    loader(async ({userName}:{userName: string}, dispatch)=>{
        const user = await getUserByName(userName);
        dispatch({
            type: LOAD_USER_DATA,
            // mock data in payload
            payload: user
        });
    }),
    connect(mapStateToProps)
)(UserProfile)
