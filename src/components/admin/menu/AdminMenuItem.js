import React from "react"

export default function AdminMenuItem(props) {
    const { item: { caption, icon_class, panel }, is_last, callback, active_panel } = props.item_props

    return(
        <div className={ `Admin-menu-item d-flex flex-row mt-auto me-auto mb-${is_last? '0' : '4'}` }
            onClick={ () => {
                if (active_panel !== panel) {
                    callback({ caption, panel })
                }
            }}>
            <i className={ `fa-solid fa-${icon_class} me-3 mt-auto mb-auto` } />
            <span className="semi-header-text mt-auto mb-auto">{ caption }</span>
        </div>
    )
}