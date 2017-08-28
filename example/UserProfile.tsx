
import * as React from "react"
import {StatelessComponent} from "react";

interface UserProfileProps {
    firstName: string;
    lastName: string;
    age: number;
}

export const UserProfile:StatelessComponent<UserProfileProps> = ({firstName, lastName, age}) => (
    <div className="profile-container">
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{age}</p>
    </div>
);
