import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

import PanelTools from "./PanelTools"
import PanelContent from "./PanelContent"
import useApi from "../../../hooks/useApi"
import LoadingBar from "../loading/LoadingBar"
import {ACTIVE_PANELS, HOST} from "../../../globalConstants"

export default function AdminEditPanel(props) {
    const itemId = useParams().id
    const isSingleView = itemId !== undefined
    const performApiCall = useApi()
    const [data, setData] = useState(Array())
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let endpoint
        switch (props.active_panel) {
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

        if (isSingleView) {
            endpoint += `?id=${itemId}`
        }

        setIsLoading(true)
        performApiCall(`${HOST}/${endpoint}`, 'GET', null, null).then(responseData => {
            setIsLoading(false)
            setData(responseData.data)
        })
    }, [props.active_panel, isSingleView])

    return(
        <div id='Admin-edit-panel' className="d-flex flex-column mt-5 mb-auto me-2 ms-3 w-100 pe-2 ps-2">
            {
                isSingleView?
                    null
                    :
                    <PanelTools panel_props={ props.active_panel } />
            }
            {
                isLoading?
                    <LoadingBar />
                    :
                    <PanelContent panel_props={{
                        active_panel: props.active_panel,
                        data,
                        is_single: isSingleView
                    }} />
            }
        </div>
    )
}