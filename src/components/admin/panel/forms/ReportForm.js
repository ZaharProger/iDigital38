import React, {useState} from "react"

import {ACTIVE_PANELS, PANEL_TOOLS} from "../../../../globalConstants"
import Tool from "../Tool"
import {prepareTime} from "../../../../utils"
import useWrap from "../../../../hooks/useWrap";

export default function ReportForm(props) {
    const { item_data, callback, item_index } = props.item_props
    const isDefined = item_data !== undefined

    const [formHeader, setFormHeader] = useState(isDefined? item_data.name : '')
    const nestedFormClasslist = `Report-form d-flex flex-column justify-content-center nested-form`

    const [getState, wrap] = useWrap(formHeader)
    const isNestedWrapped = getState()

    return(
        <div className={ nestedFormClasslist }>
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
            <label className={ isNestedWrapped? 'hidden' : '' }>
                Название доклада
            </label>
            <input name="name" type="text"
                   className={ isNestedWrapped? 'hidden' : '' }
                   defaultValue={ isDefined? item_data.name : '' }
                   onInput={ (event) => setFormHeader(event.target.value) } />
            <label className={ isNestedWrapped? 'hidden' : '' }>
                Время
            </label>
            <input name="time_start" type="time"
                   className={ isNestedWrapped? 'hidden' : '' }
                   defaultValue={ isDefined? prepareTime(item_data.time_start) : '' } />
            <label className={ isNestedWrapped? 'hidden' : '' }>
                Ключевые спикеры (необязательное поле)
                <br />
                При вводе разделяйте записи клавишей Enter
            </label>
            <textarea name="speakers"
                      defaultValue={ isDefined? item_data.speakers : '' }
                      className={ isNestedWrapped? 'hidden optional' : 'optional' } />
        </div>
    )
}