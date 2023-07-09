import React, {useEffect} from "react"

import PanelTools from "./PanelTools"
import PanelContent from "./PanelContent"

export default function AdminEditPanel(props) {
    useEffect(() => {
        const getData = async () => {
            const response = await fetch('http://localhost:8000/api/events', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            if (response.ok) {
                const responseData = await response.json()
                console.log(responseData)
            }
        }

        getData()
    }, [props.active_panel])

    return(
        <div id='Admin-edit-panel' className="d-flex flex-column mt-5 mb-auto me-2 ms-3 w-100">
            <PanelTools panel_props={ props.active_panel } />
            <PanelContent panel_props={{
                active_panel: props.active_panel
            }} />
        </div>
    )
}