import React, {useCallback, useEffect, useState} from "react"

import useWrap from "../../../../hooks/useWrap"
import DayTimetableForm from "./DayTimetableForm"
import DayBlockForm from "./DayBlockForm"
import {ACTIVE_PANELS, PANEL_TOOLS} from "../../../../globalConstants";
import Tool from "../Tool";

export default function ProgrammeDayForm(props) {
    const [getTimetableState, timetableWrap] = useWrap('Расписание на день')
    const [getBlockState, blockWrap] = useWrap('Блоки докладов')

    const { data, has_id } = props.item_props
    const isDefined = data !== undefined

    const [timetable, setTimetable] = useState(isDefined? data.day_timetable : Array())
    const [blocks, setBlocks] = useState(isDefined? data.day_blocks : Array())

    const getDropdownItems = useCallback(() => {
        const blocks = Array.from(document.getElementsByClassName('Day-block-form'))
        return blocks.map(block => {
            const itemIndex = blocks.indexOf(block)
            const itemKey = `dropdown_item_${itemIndex}`
            const isLast = itemIndex == blocks.length - 1
            const itemName = block.querySelector('.nested-form-header')
                .querySelector('.Wrap-button').querySelector('button').innerText
            const itemClasslist = `dropdown-item d-flex text-start regular-text mb-${isLast? '0' : '4'}`

            return <span key={ itemKey } className={ itemClasslist }
                         onClick={ () => {
                             document.querySelector(`.reports-tool-${itemIndex}`).scrollIntoView({
                                 behavior: "smooth",
                                 block: "center",
                                 inline: "nearest"
                             })
                         }}> { itemName }</span>
        })
    }, [])

    useEffect(() => {
        document.querySelectorAll('.nested-button').forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('timetable')) {
                    document.querySelector('.timetable-tool').scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "nearest"
                    })
                }
                else if (button.classList.contains('block')) {
                    document.querySelector('.blocks-tool').scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "nearest"
                    })
                }
            })
        })
    }, [getBlockState(), getTimetableState()])

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
                    timetable.map(item => {
                        const wrap_state = getTimetableState()
                        const itemIndex = timetable.indexOf(item)

                        return <DayTimetableForm key={ `day_timetable_${item.id}` } item_props={{
                            item_data: {
                                ...item,
                                name: item.name === undefined? `Запись в расписании ${itemIndex}` : item.name
                            },
                            item_index: itemIndex,
                            is_wrapped: wrap_state,
                            callback: (index) => {
                                const newTimetable = [...timetable]
                                newTimetable.splice(index, 1)
                                setTimetable(newTimetable)
                            }
                        }} />
                    })
                }
            </div>
            {
                !getTimetableState()?
                    <>
                        <Tool item_props={{
                            item: PANEL_TOOLS.create_nested,
                            is_single: true,
                            active_panel: ACTIVE_PANELS.forum_programme,
                            special_class: 'timetable-tool',
                            special_caption: ' запись в расписание',
                            callback: () => setTimetable([...timetable, {
                                id: Math.random() * 1000000000 + 1,
                                name: undefined,
                                time_start: 0,
                                time_end: 0,
                                moderators: '',
                                speakers: ''
                            }])
                        }} />
                        <button type="button" className="d-flex regular-text nested-button timetable"
                                style={{ insetBlock: 'auto 51vmin', insetInline: 'auto 5vmin' }}>
                            Перейти к добавлению записи в расписание
                        </button>
                    </>
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
                    blocks.map(item => {
                        const wrap_state = getBlockState()
                        const itemIndex = blocks.indexOf(item)

                        return <DayBlockForm key={ `day_block_${item.id}` } item_props={{
                            item_data: {
                                ...item,
                                name: item.name === undefined? `Блок докладов ${itemIndex}` : item.name
                            },
                            item_index: itemIndex,
                            is_wrapped: wrap_state,
                            callback: (index) => {
                                const newBlocks = [...blocks]
                                newBlocks.splice(index, 1)
                                setBlocks(newBlocks)
                            }
                        }} />
                    })
                }
            </div>
            {
                !getBlockState()?
                    <>
                        <Tool item_props={{
                            item: PANEL_TOOLS.create_nested,
                            is_single: true,
                            active_panel: ACTIVE_PANELS.forum_programme,
                            special_class: 'blocks-tool',
                            special_caption: ' блок докладов',
                            callback: () => setBlocks([...blocks, {
                                id: Math.random() * 1000000000 + 1,
                                name: undefined,
                                place: '',
                                moderators: '',
                                reports: []
                            }])
                        }} />
                        <button type="button" className="d-flex regular-text nested-button block"
                                style={{ insetBlock: 'auto 38vmin', insetInline: 'auto 5vmin' }}>
                            Перейти к добавлению блока докладов
                        </button>
                        <div className="btn-group dropstart nested-button report align-items-center d-flex"
                             style={{ insetBlock: 'auto 30vmin', insetInline: 'auto 5vmin' }}>
                            <button type="button"
                                    className="dropdown-toggle regular-text w-100 justify-content-center d-flex"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                Перейти к добавлению доклада
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    getDropdownItems()
                                }
                            </ul>
                        </div>
                    </>
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