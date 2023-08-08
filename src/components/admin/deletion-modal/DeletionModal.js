import React, {useCallback} from "react"
import {v4 as uuidV4} from "uuid"

import {ACTIVE_PANELS, HOST} from "../../../globalConstants"
import EventView from "../panel/views/EventView"
import OrganizerView from "../panel/views/OrganizerView"
import useApi from "../../../hooks/useApi"
import useEndpoint from "../../../hooks/useEndpoint"
import ProgrammeDayView from "../panel/views/ProgrammeDayView"

export default function DeletionModal(props) {
    const performApiCall = useApi()

    const { active_panel, data, callback } = props.modal_props

    let { backend_endpoint } = useEndpoint(active_panel)

    const deleteData = useCallback(() => {
        const selectedViews = Array.from(document.getElementsByClassName('view-item-static'))
        const idsToRemove = data.filter((item, index) => {
            return selectedViews[index].classList.contains('selected-view-item')
        }).map(item => item.id)
        backend_endpoint += `?ids=${idsToRemove.join(',')}`

        const deleteButton = document.getElementById('delete-button')
        const prevButtonText = deleteButton.innerText
        deleteButton.innerText = 'Удаление записей...'
        deleteButton.disabled = true

        performApiCall(`${HOST}/${backend_endpoint}`, 'DELETE', null, null).then(responseData => {
            deleteButton.innerText = prevButtonText
            deleteButton.disabled = false

            if (responseData.status == 200) {
                window.location.reload()
            }
            else {
                const warningMessage = responseData.status != 500? responseData.data.message :
                    'Произошла внутренняя ошибка сервера. Пожалуйста, повторите запрос позже'
                callback(warningMessage)
            }
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
                            Array.isArray(data)?
                                data.map((item, index) => {
                                    switch (active_panel) {
                                        case ACTIVE_PANELS.events:
                                            return <EventView key={ `event_${uuidV4()}` } item_props={{
                                                item_data: item,
                                                is_last: index == data.length - 1,
                                                is_static: true
                                            }} />
                                        case ACTIVE_PANELS.organizers:
                                            return <OrganizerView key={ `organizer_${uuidV4()}` } item_props={{
                                                item_data: item,
                                                is_last: index == data.length - 1,
                                                is_static: true
                                            }} />
                                        case ACTIVE_PANELS.forum_programme:
                                            return <ProgrammeDayView key={ `programme_day_${uuidV4()}` } item_props={{
                                                item_data: item,
                                                is_last: index == data.length - 1,
                                                is_static: true
                                            }} />
                                        default:
                                            return null
                                    }
                                })
                                :
                                null
                        }
                    </div>
                    <div className="modal-footer">
                        <button id="delete-button" type="button" onClick={ () => deleteData() }
                                className="regular-text flex-grow-1 d-flex justify-content-center me-2">
                            Удалить
                        </button>
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