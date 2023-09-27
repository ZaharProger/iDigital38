import React, {useCallback} from "react"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

import logo from "../../../assets/pics/logo.svg"
import {ROUTES} from "../../../globalConstants"
import '../../../styles/admin-header.css'
import useApi from "../../../hooks/useApi"

export default function AdminHeader(props) {
    const navigate = useNavigate()
    const adminUsername = useSelector(state => state.username)

    const performApiCall = useApi()

    const downloadAppointmentsList = useCallback(() => {
        performApiCall('/api/appointments', 'GET', null, null, true).then(responseData => {
            if (responseData.status == 200) {
                const downloadRef = document.createElement('a')
                downloadRef.href = URL.createObjectURL(responseData.data)
                downloadRef.download = 'Idigital38_Заявки.xlsx'
                downloadRef.style.display = 'none'
                document.appendChild(downloadRef)

                downloadRef.click()
                URL.revokeObjectURL(downloadRef.href);
                document.removeChild(downloadRef)
            }
        })
    }, [])

    return (
        <div id="Admin-header" className="d-flex flex-row position-fixed navbar w-100 p-3">
            <div className="container-fluid">
                <img src={logo} className="d-flex me-auto" onClick={ () => {
                    props.callback()
                    navigate(ROUTES.admin)
                } }></img>
                {
                    adminUsername !== null?
                        <span className="regular-text text-center d-flex ms-auto mt-auto mb-auto">
                                { `Вы вошли как ${adminUsername}` }
                            </span>
                        :
                        null
                }
                <button type="button"
                        onClick={ () => downloadAppointmentsList() }
                        className="regular-text d-flex text-center ms-2 mt-auto mb-auto pt-1 pb-1 pe-3 ps-3">
                    Выгрузить список заявок
                </button>
            </div>
        </div>
    )
}