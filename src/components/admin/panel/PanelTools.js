import React, {useEffect} from "react"

import Tool from "./Tool"
import {ADMIN_MENU, PANEL_TOOLS} from "../../../globalConstants"

export default function PanelTools(props) {
    const { active_panel, is_single, id_from_url, warning, callback } = props.panel_props

    const tools = is_single? [PANEL_TOOLS.back] :
        warning === null? [PANEL_TOOLS.create, PANEL_TOOLS.mark_delete] : [PANEL_TOOLS.create]

    const foundMenuItem = ADMIN_MENU.filter(item => item.panel === active_panel)
    let panelCaption = ''
    if (foundMenuItem.length != 0) {
        panelCaption = foundMenuItem[0].caption
        if (is_single) {
            panelCaption += id_from_url !== undefined? ' (Изменение записи)' : ' (Новая запись)'
        }
    }

    const captionClasslist = `d-flex me-${is_single? '3' : 'auto'} mt-auto semi-header-text pt-2 pb-2 pe-3 ps-3 tool-anim mb-1`

    useEffect(() => {
        for (let i = 0; i< tools.length; ++i) {
            if (tools[i] === PANEL_TOOLS.mark_delete) {
                const toolView = Array.from(document.getElementsByClassName('Tool'))[i]
                toolView.setAttribute('data-bs-toggle', 'modal')
                toolView.setAttribute('data-bs-target', '#Deletion-modal')
                break
            }
        }
    }, [is_single])

    return(
        <div id="Panel-tools" className="d-flex flex-row w-100 mt-5 flex-wrap">
            {
                is_single?
                    tools.map(tool => {
                        return <Tool key={ `tool_${tool.id}` } item_props={{
                            item: tool,
                            is_single,
                            active_panel,
                            callback
                        }} />
                    })
                    :
                    null
            }
            <span id="panel-header" className={ captionClasslist }>
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
                            is_single,
                            active_panel,
                            callback
                        }} />
                    })
            }
        </div>
    )
}