import React from "react"

import Tool from "./Tool"
import {PANEL_TOOLS} from "../../../globalConstants";

export default function PanelTools(props) {
    const tools = [PANEL_TOOLS.view, PANEL_TOOLS.create, PANEL_TOOLS.delete]

    return(
        <div id="Panel-tools" className="d-flex flex-row w-100 mt-5 mb-2">
            <span id="panel-header" className="d-flex me-auto mt-auto mb-auto semi-header-text pt-2 pb-2 pe-3 ps-3">
                {
                    props.panel_props.caption
                }
            </span>
            {
                tools.map(tool => {
                    return <Tool key={ `tool_${tool.id}` } item_props={{
                        item: tool,
                        is_last: tools.indexOf(tool) == tools.length - 1
                    }} />
                })
            }
        </div>
    )
}