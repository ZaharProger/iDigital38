import React from "react"

import {useNavigate} from "react-router-dom"

export default function Tool(props) {
    const navigate = useNavigate()
    const { item: { caption, icon_class, route }, is_single } = props.item_props

    return(
        <div className={ `Tool d-flex flex-row ${is_single? 'me-3' : 'ms-3'} p-2` }
            onClick={ () => navigate(route) }>
            <i className={ `fa-solid fa-${icon_class} mt-auto mb-auto me-2` } />
            <span className="text-center regular-text d-flex mt-auto mb-auto">
                {
                    caption
                }
            </span>
        </div>
    )
}