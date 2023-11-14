import React from "react"
import {v4 as uuidV4} from "uuid"
import {useDispatch, useSelector} from "react-redux"

import DayTimetableForm from "./DayTimetableForm"
import DayBlockForm from "./DayBlockForm"
import {ACTIVE_PANELS, PANEL_TOOLS} from "../../../../globalConstants"
import Tool from "../Tool"
import {mapBlockFormsToObjects, mapMainFormToObject, mapTimetableFormsToObjects} from "../../../../utils"
import setData from '../../../../redux/actions/setData'
import setRemovedTimetable from '../../../../redux/actions/setRemovedTimetable'
import setRemovedBlocks from '../../../../redux/actions/setRemovedBlocks'

export default function ProgrammeDayForm(props) {
    const dispatch = useDispatch()

    const removedTimetable = useSelector(state => state.removed_timetable)
    const removedBlocks = useSelector(state => state.removed_blocks)

    const { data, has_id } = props.item_props
    const isDefined = data !== undefined

    return(
        <form id="Programme-day-form" className="d-flex flex-column justify-content-center">
            <label>Название</label>
            <input name="name" type="text" defaultValue={ isDefined? data.name : '' }/>
            <label>Место проведения (необязательное поле)</label>
            <input name="place" type="text" defaultValue={ isDefined? data.place : '' } className="optional" />
            <div className="d-flex flex-column day-timetable">
                <label className="nested-label text-center">Расписание на день</label>
                {
                    isDefined?
                        data.day_timetable.map((item, itemIndex) => {
                            return <DayTimetableForm key={ `day_timetable_${uuidV4()}` } item_props={{
                                item_data: item,
                                item_index: itemIndex,
                                callback: (index) => {
                                    const newData = mapMainFormToObject(data)
                                    newData.day_timetable = mapTimetableFormsToObjects(data.day_timetable)
                                        .filter((_, itemIndex) => itemIndex != index)
                                    newData.day_blocks = mapBlockFormsToObjects(data.day_blocks)

                                    dispatch(setData([newData]))
                                    dispatch(setRemovedTimetable(removedTimetable.concat(item.id)))
                                }
                            }} />
                        })
                        :
                        null
                }
            </div>
            <Tool item_props={{
                item: PANEL_TOOLS.create_nested,
                is_single: true,
                active_panel: ACTIVE_PANELS.forum_programme,
                special_class: 'timetable-tool',
                special_caption: ' запись в расписание',
                callback: () => {
                    const newData = mapMainFormToObject(data)
                    newData.day_timetable = mapTimetableFormsToObjects(
                        isDefined? data.day_timetable : []
                    )
                    newData.day_timetable.push({
                        name: `Запись в расписании ${Math.round(Math.random() * 100000 + 1)}`,
                        time_start: 0,
                        time_end: 0,
                        moderators: '',
                        speakers: ''
                    })
                    newData.day_blocks = mapBlockFormsToObjects(
                        isDefined? data.day_blocks : []
                    )

                    dispatch(setData([newData]))
                }
            }} />
            <div className="d-flex flex-column day-blocks">
                <label className="nested-label text-center">Блоки докладов</label>
                {
                    isDefined?
                        data.day_blocks.map((item, itemIndex) => {
                            return <DayBlockForm key={ `day_block_${uuidV4()}` } item_props={{
                                item_data: item,
                                data: data,
                                item_index: itemIndex,
                                callback: (index) => {
                                    const newData = mapMainFormToObject(data)
                                    newData.day_timetable = mapTimetableFormsToObjects(data.day_timetable)
                                    newData.day_blocks = mapBlockFormsToObjects(data.day_blocks)
                                        .filter((_, itemIndex) => itemIndex != index)

                                    dispatch(setData([newData]))
                                    dispatch(setRemovedBlocks(removedBlocks.concat(item.id)))
                                }
                            }} />
                        })
                        :
                        null
                }
            </div>
            <Tool item_props={{
                item: PANEL_TOOLS.create_nested,
                is_single: true,
                active_panel: ACTIVE_PANELS.forum_programme,
                special_class: 'blocks-tool',
                special_caption: ' блок докладов',
                callback: () => {
                    const newData = mapMainFormToObject(data)
                    newData.day_timetable = mapTimetableFormsToObjects(
                        isDefined? data.day_timetable : []
                    )
                    newData.day_blocks = mapBlockFormsToObjects(
                        isDefined? data.day_blocks : []
                    )
                    newData.day_blocks.push({
                        name: `Блок докладов ${Math.round(Math.random() * 100000 + 1)}`,
                        place: '',
                        target_audience: '',
                        moderators: '',
                        reports: Array()
                    })

                    dispatch(setData([newData]))
                }
            }} />
            <button type="submit" className="d-flex regular-text submit-button">
                {
                    has_id? 'Сохранить изменения' : 'Создать запись'
                }
            </button>
        </form>
    )
}