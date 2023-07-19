export default function useApi() {
    const requestTypes = ['GET', 'PUT', 'DELETE', 'POST', 'PATCH']

    return async function (url, requestType, body, headers) {
        const settings = {
            method: requestTypes.includes(requestType)? requestType : requestTypes[0],
        }
        if (body !== null) {
            settings.body = body
        }
        if (headers !== null) {
            settings.headers = headers
        }

        const response = await fetch(url, settings)
        let responseData = null

        if (response.ok) {
            responseData = await response.json()
        }

        return responseData
    }
}