import React from "react";
import jwt from "jsonwebtoken";
import AuthenticationContext from "../contexts/AuthenticationContext";

function UserGreeting(props) {
    return (
        <AuthenticationContext.Consumer>
            {
                ({ accessToken }) => <>Witaj {getUserEmail(accessToken)}</>
            }
        </AuthenticationContext.Consumer>
    );
}

export default UserGreeting;


function getUserEmail(accessToken) {
    const decodedToken = jwt.decode(accessToken);
    return decodedToken.email;
}