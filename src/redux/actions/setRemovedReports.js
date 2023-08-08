import {REMOVED_REPORTS} from "../actionTypes"

export default function SetRemovedReports(reports) {
    return {
        type: REMOVED_REPORTS,
        removed_reports: reports
    }
}