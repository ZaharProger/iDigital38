import React, {useEffect} from "react"

import AdminHeader from "./header/AdminHeader"
import '../../styles/admin.css'
import AdminViewport from "./AdminViewport"

export default function AdminPage(props) {
    const { active_panel, is_single } = props.admin_props

    useEffect(() => {
        document.querySelector('body').style.overflow = 'hidden'
    }, [])

    return (
        <div id="Admin-page" className="d-flex flex-column h-100">
            <AdminHeader />
            <AdminViewport viewport_props={{
                active_panel,
                is_single
            }} />
        </div>
    )
}