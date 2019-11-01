import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeboxCreator from "./TimeboxCreator";
import TimeboxesAPI from "../api/FakeTimeboxesApi";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { RemainingTimeboxesList } from "./TimeboxesList";
import ReadOnlyTimebox from "./ReadOnlyTimebox";
import { areTimeboxesLoading, getTimeboxesLoadingError } from "../reducers";
import { fetchAllTimeboxes, addTimebox, replaceTimebox, removeTimeboxRemotely, stopEditingTimebox } from "../actions";
import { EditableTimebox } from "./EditableTimebox";


function TimeboxesManager() {
    const dispatch = useDispatch();
    const { accessToken } = useContext(AuthenticationContext);

    const timeboxesLoading = useSelector(areTimeboxesLoading);
    const timeboxesLoadingError = useSelector(getTimeboxesLoadingError);
    
    useEffect(() => {
        dispatch(fetchAllTimeboxes(accessToken))
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
        const onDelete = () => dispatch(removeTimeboxRemotely(timebox, accessToken))
        
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
            { timeboxesLoading ? "Timeboxy się ładują..." : null}
            { timeboxesLoadingError ? "Nie udało się załadować :(" : null }
            <RemainingTimeboxesList 
                renderTimebox={renderTimebox}
            />
        </>
    )
    
}


export default TimeboxesManager;
