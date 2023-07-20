import React from "react"

import Tool from "./Tool"
import {ADMIN_MENU, PANEL_TOOLS} from "../../../globalConstants"

export default function PanelTools(props) {
    const { active_panel, is_single, has_id } = props.panel_props

    const tools = is_single? [PANEL_TOOLS.back] : [PANEL_TOOLS.create, PANEL_TOOLS.delete]

    const foundMenuItem = ADMIN_MENU.filter(item => item.panel === active_panel)
    let panelCaption = ''
    if (foundMenuItem.length != 0) {
        panelCaption = foundMenuItem[0].caption
        if (is_single) {
            panelCaption += has_id? ' (Изменение записи)' : ' (Новая запись)'
        }
    }

    return(
        <div id="Panel-tools" className="d-flex flex-row w-100 mt-5 mb-1">
            {
                is_single?
                    tools.map(tool => {
                        return <Tool key={ `tool_${tool.id}` } item_props={{
                            item: tool,
                            is_single
                        }} />
                    })
                    :
                    null
            }
            <span id="panel-header" className="d-flex me-auto mt-auto mb-auto semi-header-text pt-2 pb-2 pe-3 ps-3">
                {
                    panelCaption
                }
            </span>
            {
                is_single?
                    null
                    :
                    tools.map(tool => {
                        return <Tool key={ `tool_${tool.id}` } item_props={{
                            item: tool,
                            is_single
                        }} />
                    })
            }
        </div>
    )
}