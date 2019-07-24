import React from "react";
import Header from "./Header";
import EditableTimebox from "./EditableTimebox";
import TimeboxesManager from "./TimeboxesManager";
import InspirationalQuote from "./InspirationalQuote";

function AuthenticatedApp({ onLogout}) {
    return (
        <>
            <Header onLogout={onLogout} />
            <TimeboxesManager />
            <EditableTimebox />
            <InspirationalQuote />
        </>
    );
}

export default AuthenticatedApp;