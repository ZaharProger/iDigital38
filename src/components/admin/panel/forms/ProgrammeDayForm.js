import React from "react"

import useWrap from "../../../../hooks/useWrap"
import DayTimetableForm from "./DayTimetableForm"
import DayBlockForm from "./DayBlockForm"
import {prepareTime} from "../../../../utils"

export default function ProgrammeDayForm(props) {
    const [getMainState, mainWrap] = useWrap('Основная информация о дне')
    const [getTimetableState, timetableWrap] = useWrap('Расписание на день')
    const [getBlockState, blockWrap] = useWrap('Блоки докладов')

    const { data, has_id } = props.item_props
    const isDefined = data !== undefined

    return(
        <form id="Programme-day-form" className="d-flex flex-column justify-content-center">
            <div className="wrap-form-block">
                {
                    mainWrap
                }
            </div>
            <label className={ getMainState()? 'hidden' : '' }>Название</label>
            <input name="name" type="text" defaultValue={ isDefined? data.name : '' }
                   className={ getMainState()? 'hidden' : '' } />
            <label className={ getMainState()? 'hidden' : '' }>Место проведения (необязательное поле)</label>
            <input name="place" type="text" defaultValue={ isDefined? data.place : '' }
                   className={ getMainState()? 'hidden optional' : 'optional' } />
            <div className="wrap-form-block">
                {
                    timetableWrap
                }
            </div>
            {
                isDefined && !getTimetableState()?
                    data.day_timetable.map(item => {
                        const wrap_state = getTimetableState()
                        return <DayTimetableForm key={ `day_timetable_${item.id}` } item_props={{
                           item_data:  item,
                            is_wrapped: wrap_state,
                            callback: (time) => prepareTime(time)
                        }} />
                    })
                    :
                    null
            }
            <div className="wrap-form-block">
                {
                    blockWrap
                }
            </div>
            {
                isDefined && !getBlockState()?
                    data.day_blocks.map(item => {
                        const wrap_state = getBlockState()
                        return <DayBlockForm key={ `day_block_${item.id}` } item_props={{
                            item_data:  item,
                            is_wrapped: wrap_state,
                            callback: (time) => prepareTime(time)
                        }} />
                    })
                    :
                    null
            }
            <button type="submit" className="d-flex regular-text">
                {
                    has_id? 'Сохранить изменения' : 'Создать запись'
                }
            </button>
        </form>
    )
}