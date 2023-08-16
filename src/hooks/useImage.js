import useApi from "./useApi"
import {useState} from "react"

export default function useImage(imageUri) {
    const [imageBlob, setImageBlob] = useState("")
    const performApiCall = useApi()

    if (imageUri !== null) {
        const headers = {
            'ngrok-skip-browser-warning': 'akjgorwgijeori'
        }

        performApiCall(imageUri, 'GET', null, headers, true)
            .then(responseData => {
                if (responseData.status == 200) {
                    setImageBlob(URL.createObjectURL(responseData.data))
                }
            })
    }

    return () => imageBlob
}