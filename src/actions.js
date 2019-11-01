import TimeboxesAPI from "./api/FetchTimeboxesApi";
import { isAnyTimeboxCurrent, getCurrentTimebox } from "./reducers";

export const setTimeboxes = (timeboxes) => ({ type: "TIMEBOXES_SET", timeboxes })
export const addTimebox = timebox => ({ type: "TIMEBOX_ADD", timebox });
export const replaceTimebox = replacedTimebox => ({ type: "TIMEBOX_REPLACE", replacedTimebox});
export const removeTimebox = removedTimebox => ({ type: "TIMEBOX_REMOVE", removedTimebox });
export const setError = error => ({ type: "ERROR_SET", error });
export const disableLoadingIndicator = () => ({ type: "LOADING_INDICATOR_DISABLE"});
export const stopEditingTimebox = () => ({ type: "TIMEBOX_EDIT_STOP" });
export const startEditingTimebox = (currentlyEditedTimeboxId) => ({ type: "TIMEBOX_EDIT_START", currentlyEditedTimeboxId });
export const makeTimeboxCurrent = (timebox) => ({ type: "TIMEBOX_MAKE_CURRENT", timebox });
export const finishCurrentTimebox = () => (dispatch, getState) => {
    if (isAnyTimeboxCurrent(getState())) {
        dispatch(removeTimebox(getCurrentTimebox(getState())));
    }
}

export const fetchAllTimeboxes = (accessToken) => (dispatch) => {
    TimeboxesAPI.getAllTimeboxes(accessToken).then(
        (timeboxes) => dispatch(setTimeboxes(timeboxes))
    ).catch(
        (error) => dispatch(setError(error))
    ).finally(
        () => dispatch(disableLoadingIndicator())
    )
}
export const removeTimeboxRemotely = (timebox, accessToken) => (dispatch) => {
    TimeboxesAPI.removeTimebox(timebox, accessToken)
        .then(
            () => dispatch(removeTimebox(timebox))
        );
}