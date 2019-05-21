import React from "react";

import EditableTimebox from "./EditableTimebox";
import TimeboxList from "./TimeboxList";
import Error from "./Error";

function App() {
    return (
        <div className="App">
            <Error message="Coś nie działa w całej aplikacji">
                <TimeboxList />
                <EditableTimebox />
            </Error>
        </div>
    )
}

export default App