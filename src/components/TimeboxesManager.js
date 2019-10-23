import React, { useState, useEffect, useContext } from "react";

import TimeboxCreator from "./TimeboxCreator";
import TimeboxesAPI from "../api/FetchTimeboxesApi";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { TimeboxesList } from "./TimeboxesList";
import Timebox from "./Timebox";
import ReadOnlyTimebox from "./ReadOnlyTimebox";
import TimeboxEditor from "./TimeboxEditor";
import { timeboxesReducer, isTimeboxEdited, areTimeboxesLoading, getTimeboxesLoadingError, getAllTimeboxes } from "../reducers";
import { setTimeboxes, setError, disableLoadingIndicator, addTimebox, replaceTimebox, removeTimebox, stopEditingTimebox, startEditingTimebox } from "../actions";

import { createStore } from "redux";

const store = createStore(timeboxesReducer);

function useForceUpdate() {
    const [updateCounter, setUpdateCounter] = useState(0);
    function forceUpdate() {
        setUpdateCounter(prevCounter => prevCounter + 1);
    }
    return forceUpdate;
}
function TimeboxesManager() {
    const forceUpdate = useForceUpdate();
    const state = store.getState();
    const dispatch = store.dispatch;
    useEffect(() => store.subscribe(forceUpdate), []);

    const { accessToken } = useContext(AuthenticationContext);
    useEffect(() => {
        TimeboxesAPI.getAllTimeboxes(accessToken).then(
            (timeboxes) => dispatch(setTimeboxes(timeboxes))
        ).catch(
            (error) => dispatch(setError(error))
        ).finally(
            () => dispatch(disableLoadingIndicator())
        )
    }, []);
   

    const handleCreate = (createdTimebox) => {
        try {
            TimeboxesAPI.addTimebox(createdTimebox, accessToken).then(
                (addedTimebox) => dispatch(addTimebox(addedTimebox))
            )
        } catch (error) {
            console.log("Jest błąd przy tworzeniu timeboxa:", error)
        }
        
    }
    const renderTimebox = (timebox) => {
        return <>
            {isTimeboxEdited(state, timebox) ? 
                <TimeboxEditor 
                    initialTitle={timebox.title}
                    initialTotalTimeInMinutes={timebox.totalTimeInMinutes}
                    onCancel={() => dispatch(stopEditingTimebox())}
                    onUpdate={(updatedTimebox) => {
                        const timeboxToUpdate = { ...timebox, ...updatedTimebox };
                        TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken)
                        .then(
                            (replacedTimebox) => dispatch(replaceTimebox(replacedTimebox))
                        )
                        dispatch(stopEditingTimebox());
                    }}
                /> :
                <Timebox 
                    key={timebox.id} 
                    title={timebox.title} 
                    totalTimeInMinutes={timebox.totalTimeInMinutes} 
                    onDelete={() => 
                        TimeboxesAPI.removeTimebox(timebox, accessToken)
                            .then(
                                () => dispatch(removeTimebox(timebox))
                            )
                    } 
                    onEdit={() => dispatch(startEditingTimebox(timebox.id))} 
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
            { areTimeboxesLoading(state) ? "Timeboxy się ładują..." : null}
            { getTimeboxesLoadingError(state) ? "Nie udało się załadować :(" : null }
            <TimeboxesList 
                timeboxes={getAllTimeboxes(state)} 
                renderTimebox={renderTimebox}
            />
        </>
    )
    
}


export default TimeboxesManager;
