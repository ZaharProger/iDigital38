import React from "react"

export default function DayTimetableForm(props) {
    const { item_data: { name, time_start, time_end, moderators, speakers },
        is_wrapped, callback } = props.item_props

    return(
        <div className="Day-timetable-form d-flex flex-column justify-content-center nested-form">
            <label className={ is_wrapped? 'hidden' : '' }>Название</label>
            <input name="name" type="text" defaultValue={ name } className={ is_wrapped? 'hidden' : '' } />
            <label className={ is_wrapped? 'hidden' : '' }>Начало</label>
            <input name="time_start" type="time" defaultValue={ callback(time_start) }
                   className={ is_wrapped? 'hidden' : '' } />
            <label className={ is_wrapped? 'hidden' : '' }>Конец (необязательное поле)</label>
            <input name="time_end" type="time" defaultValue={ time_end !== null? callback(time_end) : '' }
                   className={ is_wrapped? 'hidden optional' : 'optional' } />
            <label className={ is_wrapped? 'hidden' : '' }>
                Модераторы (необязательное поле)
                <br />
                При вводе разделяйте записи клавишей Enter
            </label>
            <textarea name="moderators" defaultValue={ moderators }
                      className={ is_wrapped? 'hidden optional' : 'optional' } />
            <label className={ is_wrapped? 'hidden' : '' }>
                Спикеры (необязательное поле)
                <br />
                При вводе разделяйте записи клавишей Enter
            </label>
            <textarea name="speakers" defaultValue={ speakers }
                      className={ is_wrapped? 'hidden optional' : 'optional' } />
        </div>
    )
}