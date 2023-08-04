import React from "react"
import {useNavigate} from "react-router-dom"

import logo from "../../../assets/pics/logo.svg"
import {ROUTES} from "../../../globalConstants"

export default function AdminHeader(props) {
    const navigate = useNavigate()

    return (
        <div id="Admin-header" className="d-flex flex-row position-fixed navbar w-100 p-3">
            <div className="container-fluid">
                <img src={logo} className="d-flex me-auto" onClick={ () => {
                    props.callback()
                    navigate(ROUTES.admin)
                } }></img>
                <button type="button" className="d-flex ms-auto regular-text pt-1 pb-1 pe-3 ps-3">Выход</button>
            </div>
        </div>
    )
}