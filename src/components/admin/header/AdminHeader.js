import React from "react"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

import logo from "../../../assets/pics/logo.svg"
import {HOST, ROUTES} from "../../../globalConstants"
import '../../../styles/admin-header.css'
import useApi from "../../../hooks/useApi"

export default function AdminHeader(props) {
    const navigate = useNavigate()
    const performApiCall = useApi()
    const adminUsername = useSelector(state => state.username)

    return (
        <div id="Admin-header" className="d-flex flex-row position-fixed navbar w-100 p-3">
            <div className="container-fluid">
                <img src={logo} className="d-flex me-auto" onClick={ () => {
                    props.callback()
                    navigate(ROUTES.admin)
                } }></img>
                {
                    adminUsername !== null?
                        <div className="d-flex ms-auto mt-auto mb-auto">
                            <span className="regular-text text-center d-flex me-4 mt-auto mb-auto">
                                { `Вы вошли как ${adminUsername}` }
                            </span>
                            <button type="button"
                                    onClick={ () => {
                                        performApiCall(`${HOST}/api/logout`, 'GET', null, null)
                                            .then(responseData => {
                                                if (responseData.status == 200) {
                                                    navigate(ROUTES.admin_auth)
                                                }
                                            })
                                    } }
                                    className="d-flex regular-text pt-1 pb-1 pe-3 ps-3">Выход</button>
                        </div>
                        :
                        null
                }
            </div>
        </div>
    )
}