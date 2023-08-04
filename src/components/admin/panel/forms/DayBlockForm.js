import React from "react"

import {HEADERS} from "../../../../globalConstants"
import ReportsTable from "../../../content/forumProgramme/ReportsTable"

export default function DayBlockForm(props) {
    const { item_data: { name, place, moderators, reports },
        is_wrapped, callback } = props.item_props

    return(
        <div className="Day-block-form d-flex flex-column justify-content-center nested-form">
            <label className={ is_wrapped? 'hidden' : '' }>Название</label>
            <input name="name" type="text" defaultValue={ name } className={ is_wrapped? 'hidden' : '' } />
            <label className={ is_wrapped? 'hidden' : '' }>
                Место проведения (необязательное поле)
            </label>
            <input name="place" type="text" defaultValue={ place !== null? place : '' } />
            <label className={ is_wrapped? 'hidden optional' : 'optional' }>
                Модераторы (необязательное поле)
                <br />
                При вводе разделяйте записи клавишей Enter
            </label>
            <textarea name="moderators" defaultValue={ moderators }
                   className={ is_wrapped? 'hidden optional' : 'optional' } />
            <ReportsTable table_props={{
                headers: [
                    HEADERS.report_name,
                    HEADERS.time,
                    HEADERS.main_speakers
                ],
                items: reports
            }} />
        </div>
    )
}