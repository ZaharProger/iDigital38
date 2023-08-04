import React, {useCallback} from "react"

import {ACTIVE_PANELS, HOST} from "../../../globalConstants"
import EventView from "../panel/views/EventView"
import OrganizerView from "../panel/views/OrganizerView"
import useApi from "../../../hooks/useApi"
import useEndpoint from "../../../hooks/useEndpoint"
import ProgrammeDayView from "../panel/views/ProgrammeDayView"

export default function DeletionModal(props) {
    const { data, active_panel, is_deletion_available } = props.modal_props

    const performApiCall = useApi()
    let { backend_endpoint } = useEndpoint(active_panel)

    const deleteData = useCallback(() => {
        const selectedViews = Array.from(document.getElementsByClassName('view-item-static'))
        const idsToRemove = data.filter(item => {
            return selectedViews[data.indexOf(item)].classList.contains('selected-view-item')
        }).map(item => item.id)
        backend_endpoint += `?ids=${idsToRemove.join(',')}`

        const deleteButton = document.getElementById('delete-button')
        const prevButtonText = deleteButton.innerText
        deleteButton.innerText = 'Удаление записей...'

        performApiCall(`${HOST}/${backend_endpoint}`, 'DELETE', null, null).then(_ => {
            deleteButton.innerText = prevButtonText
            window.location.reload()
        })
    }, [data])

    return(
        <div id="Deletion-modal" className="modal fade" tabIndex="-1" aria-labelledby="deletion-modal-label"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down">
                <div className="modal-content">
                    <div className="modal-header">
                            <span className="semi-header-text text-center pt-2 pb-2 pe-3 ps-3 d-flex m-auto"
                                  id="deletion-modal-label">
                                Выберите записи для удаления
                            </span>
                    </div>
                    <div className="modal-body">
                        {
                            data.map(item => {
                                switch (active_panel) {
                                    case ACTIVE_PANELS.events:
                                        return <EventView key={ `event_${item.id}` } item_props={{
                                            item_data: item,
                                            is_last: data.indexOf(item) == data.length - 1,
                                            is_static: true
                                        }} />
                                    case ACTIVE_PANELS.organizers:
                                        return <OrganizerView key={ `organizer_${item.id}` } item_props={{
                                            item_data: item,
                                            is_last: data.indexOf(item) == data.length - 1,
                                            is_static: true
                                        }} />
                                    case ACTIVE_PANELS.forum_programme:
                                        return <ProgrammeDayView key={ `programme_day_${item.id}` } item_props={{
                                            item_data: item,
                                            is_last: data.indexOf(item) == data.length - 1,
                                            is_static: true
                                        }} />
                                    default:
                                        return null
                                }
                            })
                        }
                    </div>
                    <div className="modal-footer">
                        {
                            is_deletion_available?
                                <button id="delete-button" type="button" onClick={ () => deleteData() }
                                        className="regular-text flex-grow-1 d-flex justify-content-center me-2">
                                    Удалить
                                </button>
                                :
                                null
                        }
                        <button type="button" data-bs-dismiss="modal"
                                className="regular-text flex-grow-1 d-flex justify-content-center ms-2">
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}