import React, {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"

import AdminHeader from "./header/AdminHeader"
import '../../styles/admin.css'
import AdminViewport from "./AdminViewport"
import DeletionModal from "./deletion-modal/DeletionModal"
import useApi from "../../hooks/useApi"
import useEndpoint from "../../hooks/useEndpoint"
import {ACTIVE_PANELS, HOST} from "../../globalConstants"

export default function AdminPage(props) {
    const { active_panel, is_single } = props.admin_props

    const navigate = useNavigate()
    const urlParams = useParams()
    const performApiCall = useApi()
    const [data, setData] = useState(Array())
    const [isLoading, setIsLoading] = useState(false)
    const [isDeletionAvailable, setIsDeletionAvailable] = useState(false)

    let { backend_endpoint } = useEndpoint(active_panel)

    useEffect(() => {
        const errorMessage = document.getElementById('error-message')
        if (errorMessage !== null) {
            document.getElementById('Panel-tools').removeChild(errorMessage)
        }

        if (active_panel !== null) {
            let method = 'GET'
            if (is_single) {
                if (urlParams.id === undefined) {
                    method = 'POST'
                }
                else {
                    backend_endpoint += `?id=${urlParams.id}`
                }
            }

            if (method == 'GET') {
                setIsLoading(true)
                performApiCall(`${HOST}/${backend_endpoint}`, method, null, null).then(responseData => {
                    setIsLoading(false)

                    let preparedData
                    switch (active_panel) {
                        case ACTIVE_PANELS.events:
                            preparedData = responseData.data
                                .sort((first, second) => first.date - second.date)
                            break
                        case ACTIVE_PANELS.organizers:
                            preparedData = responseData.data
                                .sort((first, second) => first.order - second.order)
                            break
                        default:
                            preparedData = Array()
                    }

                    setData(preparedData)
                })
            }
            else {
                setData(Array())
            }
        }
    }, [active_panel, is_single])

    useEffect(() => {
        document.querySelector('body').style.overflow = 'hidden'
    }, [])

    useEffect(() => {
        const viewItems = Array.from(document.getElementsByClassName('view-item'))
        const staticViewItems = Array.from(document.getElementsByClassName('view-item-static'))

        viewItems.forEach(viewItem => {
            viewItem.addEventListener('click', () => {
                navigate(`${location.pathname}/${data[viewItems.indexOf(viewItem)].id}`)
            })

            viewItem.addEventListener('mouseover', () => {
                viewItem.classList.add('selected-view-item')
            })

            viewItem.addEventListener('mouseleave', () => {
                viewItem.classList.remove('selected-view-item')
            })
        })

        let viewCounter = 0
        staticViewItems.forEach(viewItem => {
            viewItem.addEventListener('click', () => {
                if (viewItem.classList.contains('selected-view-item')) {
                    --viewCounter
                    viewItem.classList.remove('selected-view-item')
                }
                else {
                    ++viewCounter
                    viewItem.classList.add('selected-view-item')
                }

                if (viewCounter == 0) {
                    setIsDeletionAvailable(false)
                }
                else if (viewCounter == 1) {
                    setIsDeletionAvailable(true)
                }
            })
        })

        document.getElementById('Deletion-modal').addEventListener('hide.bs.modal', () => {
            viewCounter = 0
            setIsDeletionAvailable(false)
            staticViewItems.forEach(viewItem => {
                viewItem.classList.remove('selected-view-item')
            })
        })
    }, [data])

    return (
        <div id="Admin-page" className="d-flex flex-column h-100">
            <DeletionModal modal_props={{
                data,
                active_panel,
                is_deletion_available: isDeletionAvailable
            }} />
            <AdminHeader />
            <AdminViewport viewport_props={{
                active_panel,
                is_single,
                data,
                is_loading: isLoading,
                id_from_url: urlParams.id
            }} />
        </div>
    )
}