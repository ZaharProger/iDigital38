import {getCookie} from '../utils.js'

export default function useApi() {
    const requestTypes = ['GET', 'PUT', 'DELETE', 'POST', 'PATCH']

    return async function (url, requestType, body, headers, isBlobResponse=false) {
        const settings = {
            method: requestTypes.includes(requestType)? requestType : requestTypes[0],
            credentials: 'include',
	    headers: {
	        'X-CSRFToken': getCookie('csrftoken')
	    }
        }
        if (body !== null) {
            settings.body = body
        }
        if (headers !== null) {
            settings.headers = {
	        ...settings.headers,
		...headers    
	    }
        }

        const response = await fetch(url, settings)
        const responseData = response.status != 500?
            isBlobResponse? await response.blob() : await response.json() : {}

        return {
            status: response.status,
            data: responseData
        }
    }
}
