import React, {useCallback, useEffect, useState} from "react"
import {v4 as uuidV4} from "uuid"
import {useDispatch, useSelector} from "react-redux"

import useWrap from "../../../../hooks/useWrap"
import DayTimetableForm from "./DayTimetableForm"
import DayBlockForm from "./DayBlockForm"
import {ACTIVE_PANELS, PANEL_TOOLS} from "../../../../globalConstants"
import Tool from "../Tool"
import {mapBlockFormsToObjects, mapMainFormToObject, mapTimetableFormsToObjects} from "../../../../utils"
import setData from '../../../../redux/actions/setData'
import setRemovedTimetable from '../../../../redux/actions/setRemovedTimetable'
import setRemovedBlocks from '../../../../redux/actions/setRemovedBlocks'

export default function ProgrammeDayForm(props) {
    const [getTimetableState, timetableWrap] = useWrap('Расписание на день')
    const [getBlockState, blockWrap] = useWrap('Блоки докладов')

    const dispatch = useDispatch()

    const removedTimetable = useSelector(state => state.removed_timetable)
    const removedBlocks = useSelector(state => state.removed_blocks)

    const { data, has_id } = props.item_props
    const isDefined = data !== undefined

    const [isMenu, setIsMenu] = useState(true)

    const navigateToAnchor = useCallback((anchorName) => {
        const anchor = document.querySelector(`.${anchorName}`)

        anchor.classList.remove('tool-anim-back')
        anchor.classList.add('highlight')
        setTimeout(() => anchor.classList.remove('highlight'), 1100)

        anchor.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
        })
    }, [])

    useEffect(() => {
        document.querySelectorAll('.nested-button').forEach(button => {
            button.addEventListener('click', () => {
                let buttonClassName = ''
                if (button.classList.contains('timetable')) {
                    buttonClassName = 'timetable-tool'
                }
                else if (button.classList.contains('block')) {
                    buttonClassName = 'blocks-tool'
                }
                else if (!button.classList.contains('report')) {
                    buttonClassName = 'submit-button'
                }

                if (buttonClassName != '') {
                    navigateToAnchor(buttonClassName)
                }
            })
        })
    }, [getBlockState(), getTimetableState(), isMenu])

    return(
        <form id="Programme-day-form" className="d-flex flex-column justify-content-center">
            <label>Название</label>
            <input name="name" type="text" defaultValue={ isDefined? data.name : '' }/>
            <label>Место проведения (необязательное поле)</label>
            <input name="place" type="text" defaultValue={ isDefined? data.place : '' } className="optional" />
            <div className="wrap-form-block">
                {
                    timetableWrap
                }
            </div>
            <div className="d-flex flex-column day-timetable">
                {
                    isDefined?
                        data.day_timetable.map((item, itemIndex) => {
                            return <DayTimetableForm key={ `day_timetable_${uuidV4()}` } item_props={{
                                item_data: item,
                                item_index: itemIndex,
                                is_wrapped: getTimetableState(),
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
            {
                !getTimetableState()?
                    <Tool item_props={{
                        item: PANEL_TOOLS.create_nested,
                        is_single: true,
                        active_panel: ACTIVE_PANELS.forum_programme,
                        special_class: 'timetable-tool',
                        special_caption: ' запись в расписание',
                        callback: () => {
                            const newData = mapMainFormToObject(data)
                            newData.day_timetable = isDefined?
                                mapTimetableFormsToObjects(data.day_timetable) : []
                            newData.day_timetable.push({
                                name: `Запись в расписании ${Math.round(Math.random() * 100000 + 1)}`,
                                time_start: 0,
                                time_end: 0,
                                moderators: '',
                                speakers: ''
                            })
                            newData.day_blocks = isDefined?
                                mapBlockFormsToObjects(data.day_blocks) : []

                            dispatch(setData([newData]))
                        }
                    }} />
                    :
                    null
            }
            <div className="wrap-form-block">
                {
                    blockWrap
                }
            </div>
            <div className="d-flex flex-column day-blocks">
                {
                    isDefined?
                        data.day_blocks.map((item, itemIndex) => {
                            return <DayBlockForm key={ `day_block_${uuidV4()}` } item_props={{
                                item_data: item,
                                data: data,
                                item_index: itemIndex,
                                is_wrapped: getBlockState(),
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
            {
                !getBlockState()?
                    <Tool item_props={{
                        item: PANEL_TOOLS.create_nested,
                        is_single: true,
                        active_panel: ACTIVE_PANELS.forum_programme,
                        special_class: 'blocks-tool',
                        special_caption: ' блок докладов',
                        callback: () => {
                            const newData = mapMainFormToObject(data)
                            newData.day_timetable = isDefined?
                                mapTimetableFormsToObjects(data.day_timetable) : []
                            newData.day_blocks = isDefined?
                                mapBlockFormsToObjects(data.day_blocks) : []
                            newData.day_blocks.push({
                                name: `Блок докладов ${Math.round(Math.random() * 100000 + 1)}`,
                                place: '',
                                moderators: '',
                                reports: Array()
                            })

                            dispatch(setData([newData]))
                        }
                    }} />
                    :
                    null
            }
            {
                isMenu?
                    <div className="nested-menu position-fixed d-flex flex-column p-2">
                        <i className="fa-solid fa-xmark d-flex mb-2"
                           onClick={ () => setIsMenu(false) }></i>
                        <button type="button" className="d-flex regular-text nested-button timetable"
                                disabled={ getTimetableState() }>
                            Перейти к добавлению записи в расписание
                        </button>
                        <button type="button" className="d-flex regular-text nested-button block"
                                disabled={ getBlockState() }>
                            Перейти к добавлению блока докладов
                        </button>
                        <div className="btn-group dropstart nested-button report align-items-center d-flex">
                            <button type="button"
                                    className="dropdown-toggle regular-text w-100 justify-content-center d-flex"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    disabled={ getBlockState() }>
                                Перейти к добавлению доклада
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    isDefined?
                                        data.day_blocks.map((block, index) => {
                                            const itemKey = `dropdown_item_${uuidV4()}`
                                            const isLast = index == data.day_blocks.length - 1
                                            const itemName = block.name
                                            const itemClasslist = `dropdown-item d-flex text-start regular-text mb-${isLast? '0' : '4'}`

                                            return <span key={ itemKey } className={ itemClasslist }
                                                         onClick={ () => navigateToAnchor(`reports-tool-${index}`) }>
                                            { itemName }</span>
                                        })
                                        :
                                        null
                                }
                            </ul>
                        </div>
                        <button type="button" className="d-flex regular-text nested-button">
                            {
                                has_id? 'Перейти к сохранению изменений' : 'Перейти к созданию записи'
                            }
                        </button>
                    </div>
                    :
                    <i className="nested-floating-button fa-solid fa-bars d-flex mb-2 p-3 position-fixed"
                        onClick={ () => setIsMenu(true) }></i>
            }
            <button type="submit" className="d-flex regular-text submit-button">
                {
                    has_id? 'Сохранить изменения' : 'Создать запись'
                }
            </button>
        </form>
    )
}