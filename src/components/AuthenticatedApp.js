import React from "react";
import Header from "./Header";
import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import InspirationalQuote from "./InspirationalQuote";

function AuthenticatedApp({ onLogout}) {
    return (
        <>
            <Header onLogout={onLogout} />
            <TimeboxList />
            <EditableTimebox />
            <InspirationalQuote />
        </>
    );
}

export default AuthenticatedApp;