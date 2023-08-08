import React from "react"

import PanelTools from "./PanelTools"
import PanelContent from "./PanelContent"
import LoadingBar from "../loading/LoadingBar"
import WarningLabel from "../warning-label/WarningLabel"
import '../../../styles/admin-edit-panel.css'

export default function AdminEditPanel(props) {
    const { active_panel, is_single, is_loading, data,
        id_from_url, warning, callback, controlled_callback } = props.panel_props

    return(
        <div id='Admin-edit-panel' className="d-flex flex-column mt-5 me-2 ms-3 w-100 pe-2 ps-2">
            <PanelTools panel_props={{
                active_panel,
                is_single,
                id_from_url,
                warning,
                callback
            }} />
            {
                is_loading?
                    <LoadingBar />
                    :
                    warning === null?
                        <PanelContent panel_props={{
                            active_panel,
                            data,
                            is_single,
                            id_from_url,
                            controlled_callback
                        }} />
                        :
                        <WarningLabel text={ warning } />
            }
        </div>
    )
}