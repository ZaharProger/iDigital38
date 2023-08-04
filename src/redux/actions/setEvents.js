import {EVENTS} from "../actionTypes"

export default function setEvents(events) {
    return {
        type: EVENTS,
        events: events
    }
}