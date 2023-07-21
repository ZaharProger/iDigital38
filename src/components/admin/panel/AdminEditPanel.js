import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

import PanelTools from "./PanelTools"
import PanelContent from "./PanelContent"
import useApi from "../../../hooks/useApi"
import LoadingBar from "../loading/LoadingBar"
import {HOST} from "../../../globalConstants"
import useEndpoint from "../../../hooks/useEndpoint";

export default function AdminEditPanel(props) {
    const urlParams = useParams()
    const performApiCall = useApi()
    const [data, setData] = useState(Array())
    const [isLoading, setIsLoading] = useState(false)

    const { active_panel, is_single } = props.panel_props
    let { backend_endpoint } = useEndpoint(active_panel)

    useEffect(() => {
        const errorMessage = document.getElementById('error-message')
        if (errorMessage !== null) {
            document.getElementById('Panel-tools').removeChild(errorMessage)
        }

        let method = 'GET'
        if (is_single) {
            if (urlParams.id === undefined) {
                method = 'POST'
            }
            else {
                backend_endpoint += `?id=${urlParams.id}`
            }
        }

        if (method == 'GET') {
            setIsLoading(true)
            performApiCall(`${HOST}/${backend_endpoint}`, method, null, null).then(responseData => {
                setIsLoading(false)
                setData(responseData.data)
            })
        }
        else {
            setData(Array())
        }
    }, [active_panel, is_single])

    return(
        <div id='Admin-edit-panel' className="d-flex flex-column mt-5 me-2 ms-3 w-100 pe-2 ps-2">
            <PanelTools panel_props={{
                active_panel,
                is_single,
                id_from_url: urlParams.id
            }} />
            {
                isLoading?
                    <LoadingBar />
                    :
                    <PanelContent panel_props={{
                        active_panel,
                        data,
                        is_single,
                        id_from_url: urlParams.id
                    }} />
            }
        </div>
    )
}