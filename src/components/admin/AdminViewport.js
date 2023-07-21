import React from "react"

import AdminMenu from "./menu/AdminMenu"
import AdminEditPanel from "./panel/AdminEditPanel"
import WarningLabel from "./warning-label/WarningLabel"

export default function AdminViewport(props) {
    const { active_panel, is_single, data, is_loading, id_from_url } = props.viewport_props

    return (
        <div id="Admin-viewport" className="d-flex flex-row">
            <AdminMenu menu_props={{
                active_panel,
                is_single
            }} />
            {
                props.viewport_props.active_panel !== null?
                    <AdminEditPanel panel_props={{
                        active_panel,
                        is_loading,
                        is_single,
                        data,
                        id_from_url
                    }} />
                    :
                    <WarningLabel />
            }
        </div>
    )
}