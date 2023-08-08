import {REMOVED_TIMETABLE} from "../actionTypes"

export default function SetRemovedTimetable(timetable) {
    return {
        type: REMOVED_TIMETABLE,
        removed_timetable: timetable
    }
}