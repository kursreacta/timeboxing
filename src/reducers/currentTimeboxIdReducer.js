export function currentTimeboxIdReducer(state = null, action) {
    switch (action.type) {
        case "TIMEBOX_MAKE_CURRENT": {
            const { timebox } = action;
            return timebox.id;
        }
        case "TIMEBOX_REMOVE": {
            const { removedTimebox } = action;
            return state === removedTimebox.id ? null : state;
        }
        default: {
            return state;
        }
    }
}
