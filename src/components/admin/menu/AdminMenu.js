import React from "react"

import AdminMenuItem from "./AdminMenuItem"
import {ADMIN_MENU} from "../../../globalConstants"

export default function AdminMenu(props) {
    return (
        <div id="Admin-menu" className="d-flex flex-column mb-auto mt-5 me-1 ms-2">
            <div id="admin-menu-content" className="d-flex flex-column p-4 me-auto ms-auto mt-5">
                {
                    ADMIN_MENU.map(item => {
                        return <AdminMenuItem key={ `admin_menu_item_${item.id}` } item_props={{
                            item,
                            is_last: ADMIN_MENU.indexOf(item) == ADMIN_MENU.length - 1,
                            callback: props.menu_props.callback,
                            active_panel: props.menu_props.active_panel
                        }}/>
                    })
                }
            </div>
        </div>
    )
}