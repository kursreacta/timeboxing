import React, { useEffect, useContext, useReducer } from "react";

import TimeboxCreator from "./TimeboxCreator";
import TimeboxesAPI from "../api/FetchTimeboxesApi";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { TimeboxesList } from "./TimeboxesList";
import Timebox from "./Timebox";
import ReadOnlyTimebox from "./ReadOnlyTimebox";
import TimeboxEditor from "./TimeboxEditor";
import { timeboxesReducer} from "../reducers";

function TimeboxesManager() {

    const [state, dispatch] = useReducer(timeboxesReducer, undefined, timeboxesReducer);

    const { accessToken } = useContext(AuthenticationContext);
    useEffect(() => {
        TimeboxesAPI.getAllTimeboxes(accessToken).then(
            (timeboxes) => dispatch({ type: "TIMEBOXES_SET", timeboxes })
        ).catch(
            (error) => dispatch({ type: "ERROR_SET", error })
        ).finally(
            () => dispatch({ type: "LOADING_INDICATOR_DISABLE"})
        )
    }, []);
    
    const addTimebox = (timebox) => {
        TimeboxesAPI.addTimebox(timebox, accessToken).then(
            (addedTimebox) => dispatch({ type: "TIMEBOX_ADD", timebox: addedTimebox})
        )
    }
    const removeTimebox = (timeboxToRemove) => {
        TimeboxesAPI.removeTimebox(timeboxToRemove, accessToken)
            .then(
                () => dispatch({ type: "TIMEBOX_REMOVE", removedTimebox: timeboxToRemove })
            )
        
    }
    const updateTimebox = (timeboxToUpdate) => {
        TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken)
            .then(
                (replacedTimebox) => dispatch({ type: "TIMEBOX_REPLACE", replacedTimebox})
            )
        
    }

    const handleCreate = (createdTimebox) => {
        try {
            addTimebox(createdTimebox);
        } catch (error) {
            console.log("Jest błąd przy tworzeniu timeboxa:", error)
        }
        
    }
    const renderTimebox = (timebox) => {
        return <>
            {state.currentlyEditedTimeboxId === timebox.id ? 
                <TimeboxEditor 
                    initialTitle={timebox.title}
                    initialTotalTimeInMinutes={timebox.totalTimeInMinutes}
                    onCancel={() => dispatch({ type: "TIMEBOX_EDIT_STOP" })}
                    onUpdate={(updatedTimebox) => {
                        updateTimebox({ ...timebox, ...updatedTimebox });
                        dispatch({ type: "TIMEBOX_EDIT_STOP" });
                    }}
                /> :
                <Timebox 
                    key={timebox.id} 
                    title={timebox.title} 
                    totalTimeInMinutes={timebox.totalTimeInMinutes} 
                    onDelete={() => removeTimebox(timebox)} 
                    onEdit={() => dispatch({ type: "TIMEBOX_EDIT_START", currentlyEditedTimeboxId: timebox.id })} 
                />
            }
        </>
    }
    function renderReadOnlyTimebox(timebox, index) {
        return <ReadOnlyTimebox
            key={timebox.id} 
            title={timebox.title} 
            totalTimeInMinutes={timebox.totalTimeInMinutes}
        />
    }
    
        return (
            <>
                <TimeboxCreator onCreate={handleCreate} />
                { state.loading ? "Timeboxy się ładują..." : null}
                { state.error ? "Nie udało się załadować :(" : null }
                <TimeboxesList 
                    timeboxes={state.timeboxes} 
                    renderTimebox={renderTimebox}
                />
            </>
        )
    
}


export default TimeboxesManager;
