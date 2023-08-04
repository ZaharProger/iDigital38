import initialState from "./initialState"
import {EVENTS, FORUM_PROGRAMME, ORGANIZERS} from "./actionTypes"

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case EVENTS:
            return {
                ...state,
                events: action.events
            }
        case ORGANIZERS:
            return {
                ...state,
                organizers: action.organizers
            }
        case FORUM_PROGRAMME:
            return {
                ...state,
                forum_programme: action.forum_programme
            }
        default:
            return state
    }
}