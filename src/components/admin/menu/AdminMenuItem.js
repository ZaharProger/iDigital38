import React from "react"

import {useParams} from "react-router-dom"

export default function AdminMenuItem(props) {
    const isSingleView = useParams().id !== undefined
    const { item: { caption, icon_class, panel, route }, is_last, callback, active_panel } = props.item_props

    return(
        <div className={ `Admin-menu-item d-flex flex-row mt-auto me-auto mb-${is_last? '0' : '4'}` }
            onClick={ () => {
                if (active_panel !== panel || isSingleView) {
                    callback(route, {
                        panel,
                        caption
                    })
                }
            }}>
            <i className={ `fa-solid fa-${icon_class} me-3 mt-auto mb-auto` } />
            <span className="semi-header-text mt-auto mb-auto">{ caption }</span>
        </div>
    )
}