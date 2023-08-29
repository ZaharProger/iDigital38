import {ACTIVE_PANELS, ROUTES} from "../globalConstants"

export default function useEndpoint(activePanel, isGetRequest=true) {
    let backendEndpoint
    let frontendEndpoint
    switch (activePanel) {
        case ACTIVE_PANELS.events:
            backendEndpoint = '/api/events'
            frontendEndpoint = ROUTES.admin_events
            break
        case ACTIVE_PANELS.organizers:
            backendEndpoint = '/api/organizers'
            frontendEndpoint = ROUTES.admin_organizers
            break
        case ACTIVE_PANELS.forum_programme:
            backendEndpoint = '/api/forum-programme'
            frontendEndpoint = ROUTES.admin_forum_programme
            break
        default:
            backendEndpoint = ''
            frontendEndpoint = ''
            break
    }

    return {
        backend_endpoint: isGetRequest? backendEndpoint : backendEndpoint + '/',
        frontend_endpoint: frontendEndpoint
    }
}