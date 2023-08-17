import {initialLandingState, initialAdminState, initialAuthState} from "./initialState"
import {
    DATA,
    EVENTS,
    FORUM_PROGRAMME,
    ORGANIZERS,
    REMOVED_BLOCKS,
    REMOVED_REPORTS,
    REMOVED_TIMETABLE, USERNAME
} from "./actionTypes"

export function landingReducer(state=initialLandingState, action) {
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

export function adminReducer(state=initialAdminState, action) {
    switch (action.type) {
        case DATA:
            return {
                ...state,
                data: action.data
            }
        case REMOVED_TIMETABLE:
            return {
                ...state,
                removed_timetable: action.removed_timetable
            }
        case REMOVED_BLOCKS:
            return {
                ...state,
                removed_blocks: action.removed_blocks
            }
        case REMOVED_REPORTS:
            return {
                ...state,
                removed_reports: action.removed_reports
            }
        default:
            return state
    }
}

export function authReducer(state=initialAuthState, action) {
    switch (action.type) {
        case USERNAME:
            return {
                ...state,
                username: action.username
            }
        default:
            return state
    }
}