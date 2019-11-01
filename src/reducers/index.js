import { currentTimeboxIdReducer } from "./currentTimeboxIdReducer";
import timeboxesReducer, * as timeboxesSelectors from "./timeboxesReducer";
import { currentlyEditedTimeboxIdReducer } from "./currentlyEditedTimeboxIdReducer";
import { timeboxesAreLoadingReducer } from "./timeboxesAreLoadingReducer";
import { timeboxesLoadingErrorReducer } from "./timeboxesLoadingErrorReducer";

export function rootReducer(state = {}, action) {
    return {
        currentTimeboxId: currentTimeboxIdReducer(state.currentTimeboxId, action),
        timeboxes: timeboxesReducer(state.timeboxes, action),
        currentlyEditedTimeboxId: currentlyEditedTimeboxIdReducer(state.currentlyEditedTimeboxId, action),
        timeboxesAreLoading: timeboxesAreLoadingReducer(state.timeboxesAreLoading, action),
        timeboxesLoadingError: timeboxesLoadingErrorReducer(state.timeboxesLoadingError, action)
    }
}

export const getAllTimeboxes = (state) => timeboxesSelectors.getAllTimeboxes(state.timeboxes);
export const getRemainingTimeboxes = (state) => timeboxesSelectors.getRemainingTimeboxes(state.timeboxes);
export const getTimeboxById = (state, timeboxId) => timeboxesSelectors.getTimeboxById(state.timeboxes, timeboxId);

export const areTimeboxesLoading = (state) => state.timeboxesAreLoading;
export const getTimeboxesLoadingError = (state) => state.timeboxesLoadingError;
export const isTimeboxEdited = (state, timebox) => state.currentlyEditedTimeboxId && state.currentlyEditedTimeboxId === timebox.id;
export const getCurrentlyEditedTimebox = (state) => getTimeboxById(state, state.currentlyEditedTimeboxId);
export const isAnyTimeboxEdited = (state) => !!state.currentlyEditedTimeboxId;
export const isAnyTimeboxCurrent = (state) => !!state.currentTimeboxId;
export const getCurrentTimebox = (state) => isAnyTimeboxCurrent(state) ? getTimeboxById(state, state.currentTimeboxId) : null;