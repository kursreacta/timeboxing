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
            <CurrentTimebox 
                        title="Optymalizuję aplikacje" 
                        totalTimeInMinutes={4} 
                    />
            <InspirationalQuote />
        </>
    );
}

export default AuthenticatedApp;