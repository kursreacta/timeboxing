import React from "react";
import Header from "./Header";
import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";

function AuthenticatedApp({ onLogout}) {
    return (
        <>
            <Header onLogout={onLogout} />
            <TimeboxList />
            <EditableTimebox />
        </>
    );
}

export default AuthenticatedApp;