import React, {useEffect, useState} from "react"

import AdminHeader from "./header/AdminHeader"
import '../../styles/admin.css'
import AdminViewport from "./AdminViewport"

export default function AdminPage() {
    const [activePanel, setActivePanel] = useState(null)

    useEffect(() => {
        document.querySelectorAll('.Admin-menu-item, .Tool').forEach(menuItem => {
            menuItem.addEventListener('mouseover', () => {
                menuItem.querySelector('i').style.color = 'var(--border-color)'
                menuItem.querySelector('span').style.color = 'var(--border-color'
            })
            menuItem.addEventListener('mouseleave', () => {
                menuItem.querySelector('i').style.color = 'var(--secondary-color)'
                menuItem.querySelector('span').style.color = 'var(--secondary-color'
            })
        })
    }, [activePanel])

    return (
        <div id="Admin-page" className="d-flex flex-column h-100">
            <AdminHeader />
            <AdminViewport viewport_props={{
                active_panel: activePanel,
                callback: (newPanel) => setActivePanel(newPanel)
            }} />
        </div>
    )
}