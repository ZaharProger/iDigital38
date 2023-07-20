import React from "react"

import {useNavigate} from "react-router-dom"

export default function AdminMenuItem(props) {
    const navigate = useNavigate()
    const { item: { caption, icon_class, panel, route }, is_last, active_panel, is_single } = props.item_props

    return(
        <div className={ `Admin-menu-item d-flex flex-row mt-auto me-auto mb-${is_last? '0' : '4'}` }
            onClick={ () => {
                if (active_panel !== panel || is_single) {
                    navigate(route)
                }
            }}>
            <i className={ `fa-solid fa-${icon_class} me-3 mt-auto mb-auto` } />
            <span className="semi-header-text mt-auto mb-auto">{ caption }</span>
        </div>
    )
}