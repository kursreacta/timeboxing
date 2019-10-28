import React from "react";
import Header from "./Header";
import CurrentTimebox from "./CurrentTimebox";
import TimeboxesManager from "./TimeboxesManager";
import InspirationalQuote from "./InspirationalQuote";
import UserGreeting from "./UserGreeting";

function AuthenticatedApp({ onLogout }) {
    return (
        <>
            <Header>
                <UserGreeting />      
            </Header>
            <TimeboxesManager />
            <CurrentTimebox />
            <InspirationalQuote />
        </>
    );
}

export default AuthenticatedApp;