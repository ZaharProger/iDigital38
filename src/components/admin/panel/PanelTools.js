import React from "react"
import {useLocation} from "react-router-dom"

import Tool from "./Tool"
import {ADMIN_MENU, PANEL_TOOLS} from "../../../globalConstants"

export default function PanelTools(props) {
    const location = useLocation()
    const tools = [PANEL_TOOLS.create, PANEL_TOOLS.delete]

    let panelCaption
    if (location.state !== null) {
        panelCaption = location.state.caption
    }
    else {
        const foundMenuItem = ADMIN_MENU.filter(item => item.panel === props.panel_props)
        panelCaption = foundMenuItem.length != 0? foundMenuItem[0].caption : ''
    }

    return(
        <div id="Panel-tools" className="d-flex flex-row w-100 mt-5 mb-2">
            <span id="panel-header" className="d-flex me-auto mt-auto mb-auto semi-header-text pt-2 pb-2 pe-3 ps-3">
                {
                    panelCaption
                }
            </span>
            {
                tools.map(tool => {
                    return <Tool key={ `tool_${tool.id}` } item_props={{
                        item: tool
                    }} />
                })
            }
        </div>
    )
}