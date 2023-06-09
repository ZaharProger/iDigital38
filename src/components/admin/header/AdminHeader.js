import React from "react"

import logo from "../../../assets/pics/logo.svg"

export default function AdminHeader() {
    return (
        <div id="Admin-header" className="d-flex flex-row position-fixed navbar w-100 p-3">
            <div className="container-fluid">
                <img src={logo} className="d-flex me-auto"></img>
                <button type="button" className="d-flex ms-auto regular-text pt-1 pb-1 pe-3 ps-3">Выход</button>
            </div>
        </div>
    )
}