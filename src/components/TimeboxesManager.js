import React, { useState, useEffect, useContext } from "react";
import { useStore } from "react-redux";
import TimeboxCreator from "./TimeboxCreator";
import TimeboxesAPI from "../api/FetchTimeboxesApi";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { AllTimeboxesList } from "./TimeboxesList";
import ReadOnlyTimebox from "./ReadOnlyTimebox";
import { areTimeboxesLoading, getTimeboxesLoadingError } from "../reducers";
import { setTimeboxes, setError, disableLoadingIndicator, addTimebox, replaceTimebox, removeTimebox, stopEditingTimebox } from "../actions";
import { EditableTimebox } from "./EditableTimebox";

export function useForceUpdate() {
    const [updateCounter, setUpdateCounter] = useState(0);
    function forceUpdate() {
        setUpdateCounter(prevCounter => prevCounter + 1);
    }
    return forceUpdate;
}
function TimeboxesManager() {
    const store = useStore();
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
        const onUpdate = (updatedTimebox) => {
            const timeboxToUpdate = { ...timebox, ...updatedTimebox };
            TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken)
            .then(
                (replacedTimebox) => dispatch(replaceTimebox(replacedTimebox))
            )
            dispatch(stopEditingTimebox());
        };
        const onDelete = () => 
        TimeboxesAPI.removeTimebox(timebox, accessToken)
            .then(
                () => dispatch(removeTimebox(timebox))
            );
        return <EditableTimebox
            timebox={timebox}
            onUpdate={onUpdate}
            onDelete={onDelete}
        />;
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
            <AllTimeboxesList 
                renderTimebox={renderTimebox}
            />
        </>
    )
    
}


export default TimeboxesManager;
