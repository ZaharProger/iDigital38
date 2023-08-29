import React, {useCallback, useEffect, useRef, useState} from "react"
import {useNavigate, useParams, useLocation} from "react-router-dom"
import {Provider, useDispatch, useSelector} from "react-redux"

import AdminHeader from "./header/AdminHeader"
import '../../styles/admin.css'
import AdminViewport from "./AdminViewport"
import DeletionModal from "./deletion-modal/DeletionModal"
import useApi from "../../hooks/useApi"
import useEndpoint from "../../hooks/useEndpoint"
import {ACTIVE_PANELS} from "../../globalConstants"
import '../../styles/admin-page.css'
import setData from '../../redux/actions/setData'
import setRemovedTimetable from '../../redux/actions/setRemovedTimetable'
import setRemovedBlocks from '../../redux/actions/setRemovedBlocks'
import setRemovedReports from "../../redux/actions/setRemovedReports"
import {authStore} from "../../redux/store"

export default function AdminPage(props) {
    const { active_panel, is_single } = props.admin_props

    const location = useLocation()
    const navigate = useNavigate()
    const urlParams = useParams()
    const performApiCall = useApi()
    const [isLoading, setIsLoading] = useState(false)
    const [warning, setWarning] = useState(null)

    const dispatch = useDispatch()
    const data = useSelector(state => state.data)

    let { backend_endpoint: backendGetEndpoint } = useEndpoint(active_panel)
    const { backend_endpoint: backendPatchEndpoint } = useEndpoint(active_panel, false)

    const dragItem = useRef()
    const dragOverItem = useRef()

    const prepareData = useCallback((data) => {
        let preparedData
        switch (active_panel) {
            case ACTIVE_PANELS.events:
                preparedData = data
                    .sort((first, second) => first.date - second.date)
                break
            case ACTIVE_PANELS.organizers:
                preparedData = data
                    .sort((first, second) => first.order - second.order)
                break
            case ACTIVE_PANELS.forum_programme:
                preparedData = data.map(item => {
                    const sortedTimetable = item.day_timetable
                        .sort((first, second) => first.time_start - second.time_start)
                    const sortedBlocks = item.day_blocks.map(block => {
                        return {
                            ...block,
                            reports: block.reports
                                .sort((first, second) => first.time_start - second.time_start)
                        }
                    })

                    item.day_timetable = sortedTimetable
                    item.day_blocks = sortedBlocks

                    return item
                })
                break
            default:
                preparedData = data
        }

        return preparedData
    }, [active_panel, data])
    const updateData = useCallback((responseData) => {
        setIsLoading(false)
        if (responseData.status == 200) {
            setWarning(null)
            dispatch(setData(prepareData(responseData.data.data)))
        }
        else {
            const warningMessage = responseData.status != 500? responseData.data.message :
                'Произошла внутренняя ошибка сервера. Пожалуйста, повторите запрос позже'
            setWarning(warningMessage)
            dispatch(setData(Array()))
        }

        dispatch(setRemovedReports(Array()))
        dispatch(setRemovedTimetable(Array()))
        dispatch(setRemovedBlocks(Array()))
    }, [active_panel])

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
                    backendGetEndpoint += `?id=${urlParams.id}`
                }
            }

            if (method == 'GET') {
                setIsLoading(true)
                performApiCall(backendGetEndpoint, method, null, null).then(responseData => {
                    updateData(responseData)
                })
            }
            else {
                dispatch(setData(Array()))
            }
        }
    }, [active_panel, is_single])

    useEffect(() => {
        document.querySelector('body').style.overflow = 'hidden'
    }, [])

    useEffect(() => {
        const viewItems = Array.from(document.getElementsByClassName('view-item'))
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

            viewItem.addEventListener('dragstart', (e) => {
                dragItem.current = viewItems.indexOf(viewItem)
            })

            viewItem.addEventListener('dragover', (e) => {
                e.preventDefault()
                e.target.classList.add('selected-view-item')
            })

            viewItem.addEventListener('dragleave', (e) => {
                e.target.classList.remove('selected-view-item')
            })

            viewItem.addEventListener('dragenter', (e) => {
                e.preventDefault()
                dragOverItem.current = viewItems.indexOf(viewItem)
            })

            viewItem.addEventListener('click', () => {
                navigate(`${location.pathname}/${data[viewItems.indexOf(viewItem)].id}`)
            })

            viewItem.addEventListener('drop', (e) => {
                e.preventDefault()

                if (dragItem.current != dragOverItem.current) {
                    const copiedData = [...data]
                    const dragItemContent = copiedData[dragItem.current]

                    copiedData.splice(dragItem.current, 1)
                    copiedData.splice(dragOverItem.current, 0, dragItemContent)

                    dragItem.current = null
                    dragOverItem.current = null

                    const requestBody = new FormData()
                    let order = -1
                    copiedData.forEach(item => {
                        requestBody.append(item.id, ++order)
                    })

                    setIsLoading(true)

                    performApiCall(backendPatchEndpoint, 'PATCH', requestBody, null).then(_ => {
                        performApiCall(backendGetEndpoint, 'GET', null, null).then(responseData => {
                            updateData(responseData)
                        })
                    })
                }
            })
        })

        let viewCounter = 0
        const staticViewItems = Array.from(document.getElementsByClassName('view-item-static'))
        const deleteButton = document.getElementById('delete-button')
        if (deleteButton !== null) {
            deleteButton.disabled = true
        }

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
                    deleteButton.disabled = true
                }
                else if (viewCounter == 1) {
                    deleteButton.disabled = false
                }
            })
        })

        const deletionModal = document.getElementById('Deletion-modal')
        if (deletionModal !== null) {
            deletionModal.addEventListener('hide.bs.modal', () => {
                viewCounter = 0
                deleteButton.disabled = true
                staticViewItems.forEach(viewItem => {
                    viewItem.classList.remove('selected-view-item')
                })
            })
        }
    }, [isLoading])

    return (
        <div id="Admin-page" className="d-flex flex-column h-100">
            <DeletionModal modal_props={{
                active_panel,
                data,
                callback: (value) => setWarning(value)
            }} />
            <Provider store={ authStore }>
                <AdminHeader callback={ () => setWarning(null) } />
            </Provider>
            <AdminViewport viewport_props={{
                active_panel,
                is_single,
                data,
                is_loading: isLoading,
                id_from_url: urlParams.id,
                warning: warning,
                callback: () => setWarning(null),
                controlled_callback: (value) => setWarning(value)
            }} />
        </div>
    )
}