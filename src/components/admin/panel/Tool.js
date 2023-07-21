import React from "react"

import {useNavigate} from "react-router-dom"
import useEndpoint from "../../../hooks/useEndpoint"
import {PANEL_TOOLS} from "../../../globalConstants"

export default function Tool(props) {
    const navigate = useNavigate()
    const { item: { caption, icon_class, route }, is_single, active_panel } = props.item_props
    const { frontend_endpoint } = useEndpoint(active_panel)

    return(
        <div className={ `Tool d-flex flex-row ${is_single? 'me-3 tool-anim-back' : 'ms-3 tool-anim'} p-2 mb-1` }
            onClick={ () => {
                if (route === undefined) {
                    navigate(frontend_endpoint)
                }
                else if (route !== null) {
                    navigate(frontend_endpoint + route)
                }
                else {
                    if (props.item_props.item === PANEL_TOOLS.delete) {

                    }
                }
            } }>
            <i className={ `fa-solid fa-${icon_class} mt-auto mb-auto me-2` } />
            <span className="text-center regular-text d-flex mt-auto mb-auto">
                {
                    caption
                }
            </span>
        </div>
    )
}