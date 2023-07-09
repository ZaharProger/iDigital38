import React from "react"

import AdminMenu from "./menu/AdminMenu"
import AdminEditPanel from "./panel/AdminEditPanel"
import WarningLabel from "./warning-label/WarningLabel"

export default function AdminViewport(props) {
    return (
        <div id="Admin-viewport" className="d-flex flex-row pe-3 ps-3 pb-2">
            <AdminMenu menu_props={ props.viewport_props } />
            {
                props.viewport_props.active_panel !== null?
                    <AdminEditPanel active_panel={ props.viewport_props.active_panel } />
                    :
                    <WarningLabel />
            }
        </div>
    )
}