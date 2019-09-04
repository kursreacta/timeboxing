import React from "react";
import Header from "./Header";
import CurrentTimebox from "./CurrentTimebox";
import TimeboxesManager from "./TimeboxesManager";
import InspirationalQuote from "./InspirationalQuote";

function AuthenticatedApp({ onLogout}) {
    return (
        <>
            <Header onLogout={onLogout} />
            <TimeboxesManager />
            <CurrentTimebox 
                        title="Uczę się zaawansowanych wzorców" 
                        totalTimeInMinutes={4} 
                    />
            <InspirationalQuote />
        </>
    );
}

export default AuthenticatedApp;