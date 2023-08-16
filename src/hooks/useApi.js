export default function useApi() {
    const requestTypes = ['GET', 'PUT', 'DELETE', 'POST', 'PATCH']

    return async function (url, requestType, body, headers, isBlob=false) {
        const settings = {
            method: requestTypes.includes(requestType)? requestType : requestTypes[0],
            credentials: 'include'
        }
        if (body !== null) {
            settings.body = body
        }
        if (headers !== null) {
            settings.headers = headers
        }

        const response = await fetch(url, settings)
        const responseData = response.status != 500? isBlob? await response.blob() : await response.json() : {}

        return {
            status: response.status,
            data: responseData
        }
    }
}