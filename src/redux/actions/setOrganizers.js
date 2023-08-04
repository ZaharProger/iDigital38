import {ORGANIZERS} from "../actionTypes"

export default function setOrganizers(organizers) {
    return {
        type: ORGANIZERS,
        organizers: organizers
    }
}