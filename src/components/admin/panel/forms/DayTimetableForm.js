import React, {useState} from "react"

import Tool from "../Tool"
import {ACTIVE_PANELS, PANEL_TOOLS} from "../../../../globalConstants"
import {prepareTime} from "../../../../utils"
import useWrap from "../../../../hooks/useWrap"

export default function DayTimetableForm(props) {
    const { item_data, callback, item_index } = props.item_props
    const isDefined = item_data !== undefined

    const [formHeader, setFormHeader] = useState(isDefined? item_data.name : '')

    const [getState, wrap] = useWrap(formHeader)
    const isNestedWrapped = getState()

    return(
        <div className="Day-timetable-form d-flex flex-column justify-content-center nested-form">
            <div className="d-flex flex-row justify-content-between align-items-center nested-form-header">
                <div className="d-flex">
                    {
                        wrap
                    }
                </div>
                <Tool item_props={{
                    item: PANEL_TOOLS.delete,
                    is_single: true,
                    active_panel: ACTIVE_PANELS.forum_programme,
                    callback: () => callback(item_index)
                }} />
            </div>
            <label className={ isNestedWrapped? 'hidden' : '' }>Название</label>
            <input name="name" type="text"
                   className={ isNestedWrapped? 'hidden' : '' }
                   defaultValue={ isDefined? item_data.name : '' }
                   onInput={ (event) => setFormHeader(event.target.value) } />
            <label className={ isNestedWrapped? 'hidden' : '' }>Начало</label>
            <input name="time_start" type="time"
                   className={ isNestedWrapped? 'hidden' : '' }
                   defaultValue={ isDefined? prepareTime(item_data.time_start) : '' } />
            <label className={ isNestedWrapped? 'hidden' : '' }>Конец (необязательное поле)</label>
            <input name="time_end" type="time"
                   defaultValue={ isDefined && item_data.time_end !== null? prepareTime(item_data.time_end) : '' }
                   className={ isNestedWrapped? 'hidden optional' : 'optional' } />
            <label className={ isNestedWrapped? 'hidden' : '' }>
                Модераторы (необязательное поле)
                <br />
                При вводе разделяйте записи клавишей Enter
            </label>
            <textarea name="moderators"
                      defaultValue={ isDefined? item_data.moderators : '' }
                      className={ isNestedWrapped? 'hidden optional' : 'optional' } />
            <label className={ isNestedWrapped? 'hidden' : '' }>
                Спикеры (необязательное поле)
                <br />
                При вводе разделяйте записи клавишей Enter
            </label>
            <textarea name="speakers"
                      defaultValue={ isDefined? item_data.speakers : '' }
                      className={ isNestedWrapped? 'hidden optional' : 'optional' } />
        </div>
    )
}