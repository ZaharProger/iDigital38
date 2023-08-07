import React, {useState} from "react"
import {v4 as uuidV4} from "uuid"

import {ACTIVE_PANELS, PANEL_TOOLS} from "../../../../globalConstants"
import Tool from "../Tool"
import ReportForm from "./ReportForm"
import useWrap from "../../../../hooks/useWrap";

export default function DayBlockForm(props) {
    const { item_data, is_wrapped, callback, item_index } = props.item_props
    const isDefined = item_data !== undefined

    const [formHeader, setFormHeader] = useState(isDefined? item_data.name : '')
    const nestedFormClasslist = `Day-block-form d-flex flex-column justify-content-center nested-form${is_wrapped? ' hidden' : ''}`

    const [getState, wrap] = useWrap(formHeader)
    const isNestedWrapped = getState()

    const [reports, setReports] = useState(isDefined? item_data.reports.sort((first, second) => {
        return first.time_start - second.time_start
    }) : Array())

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
            <label className={ isNestedWrapped || is_wrapped? 'hidden' : '' }>Название</label>
            <input name="name" type="text"
                   className={ isNestedWrapped || is_wrapped? 'hidden' : '' }
                   onInput={ (event) => setFormHeader(event.target.value) }
                   defaultValue={ isDefined? item_data.name : '' }/>
            <label className={ isNestedWrapped || is_wrapped? 'hidden' : '' }>
                Место проведения (необязательное поле)
            </label>
            <input name="place" type="text"
                   defaultValue={ isDefined && item_data.place !== null? item_data.place : '' }
                   className={ isNestedWrapped || is_wrapped? 'hidden optional' : 'optional' } />
            <label className={ isNestedWrapped || is_wrapped? 'hidden' : '' }>
                Модераторы (необязательное поле)
                <br />
                При вводе разделяйте записи клавишей Enter
            </label>
            <textarea name="moderators" defaultValue={ isDefined? item_data.moderators : '' }
                      className={ isNestedWrapped || is_wrapped? 'hidden optional' : 'optional' } />
            <label className={ `text-center report-label${is_wrapped? ' hidden' : ''}` }>
                Список докладов
            </label>
            <div className={ `d-flex flex-column reports${is_wrapped? ' hidden' : ''}` }>
                {
                    reports.map((item, itemIndex) => {
                        return <ReportForm key={ `report_${uuidV4()}` } item_props={{
                            item_data:  item,
                            item_index: itemIndex,
                            callback: (index) => {
                                setReports(reports.filter((_, itemIndex) => itemIndex != index))
                            }
                        }} />
                    })
                }
            </div>
            {
                is_wrapped?
                    null
                    :
                    <Tool item_props={{
                        item: PANEL_TOOLS.create_nested,
                        is_single: true,
                        active_panel: ACTIVE_PANELS.forum_programme,
                        special_class: `reports-tool-${item_index}`,
                        special_caption: ' доклад',
                        callback: () => setReports(reports.concat({
                            name: `Доклад ${Math.round(Math.random() * 100000 + 1)}`,
                            time_start: 0,
                            speakers: ''
                        }))
                    }} />
            }
        </div>
    )
}