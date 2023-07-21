import React from "react"

import {ACTIVE_PANELS} from "../../../globalConstants"
import EventView from "../panel/views/EventView"
import OrganizerView from "../panel/views/OrganizerView"

export default function DeletionModal(props) {
    const { data, active_panel, is_deletion_available } = props.modal_props

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
                                    default:
                                        return null
                                }
                            })
                        }
                    </div>
                    <div className="modal-footer">
                        {
                            is_deletion_available?
                                <button type="button"
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