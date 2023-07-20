import React, {useEffect} from "react"

import AdminMenuItem from "./AdminMenuItem"
import {ADMIN_MENU} from "../../../globalConstants"

export default function AdminMenu(props) {
    useEffect(() => {
        document.querySelectorAll('.Admin-menu-item').forEach(menuItem => {
            menuItem.addEventListener('mouseover', () => {
                menuItem.querySelector('i').style.color = 'var(--border-color)'
                menuItem.querySelector('span').style.color = 'var(--border-color'
            })
            menuItem.addEventListener('mouseleave', () => {
                menuItem.querySelector('i').style.color = 'var(--secondary-color)'
                menuItem.querySelector('span').style.color = 'var(--secondary-color'
            })
        })
    }, [])
    
    return (
        <div id="Admin-menu" className="d-flex flex-column mb-auto mt-5 ms-3">
            <div id="admin-menu-content" className="d-flex flex-column p-4 me-auto ms-auto mt-5">
                {
                    ADMIN_MENU.map(item => {
                        return <AdminMenuItem key={ `admin_menu_item_${item.id}` } item_props={{
                            item,
                            is_last: ADMIN_MENU.indexOf(item) == ADMIN_MENU.length - 1,
                            active_panel: props.menu_props.active_panel,
                            is_single: props.menu_props.is_single
                        }}/>
                    })
                }
            </div>
        </div>
    )
}