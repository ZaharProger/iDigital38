import {ACTIVE_PANELS} from "../globalConstants"

export default function useEndpoint(activePanel, isGetRequest=true) {
    let endpoint
    switch (activePanel) {
        case ACTIVE_PANELS.events:
            endpoint = 'api/events'
            break
        case ACTIVE_PANELS.organizers:
            endpoint = 'api/organizers'
            break
        default:
            endpoint = ''
            break
    }

    return isGetRequest? endpoint : endpoint + '/'
}