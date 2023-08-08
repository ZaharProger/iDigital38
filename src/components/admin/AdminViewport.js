import React from "react"

import AdminMenu from "./menu/AdminMenu"
import AdminEditPanel from "./panel/AdminEditPanel"
import WarningLabel from "./warning-label/WarningLabel"
import '../../styles/admin-viewport.css'

export default function AdminViewport(props) {
    const { active_panel, is_single, is_loading,
        id_from_url, warning, data, callback, controlled_callback } = props.viewport_props

    return (
        <div id="Admin-viewport" className="d-flex flex-row">
            <AdminMenu menu_props={{
                active_panel,
                is_single,
                callback,
                data
            }} />
            {
                active_panel !== null?
                    <AdminEditPanel panel_props={{
                        active_panel,
                        is_loading,
                        is_single,
                        data,
                        id_from_url,
                        warning,
                        callback,
                        controlled_callback
                    }} />
                    :
                    <WarningLabel text={ null } />
            }
        </div>
    )
}