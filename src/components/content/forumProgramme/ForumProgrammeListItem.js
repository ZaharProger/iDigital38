import React, {useState} from "react"

import TimetableListItem from "./TimetableListItem"
import WrapButton from "../wrap-button/WrapButton"

export default function ForumProgrammeListItem(props) {
    const [isWrapped, setIsWrapped] = useState(true)

    const { item_data, is_last } = props.item_props
    const { date, name, place, timetable, report_table: reports } = item_data
    let itemHeader = date
    if (name != '') {
        itemHeader += `. ${name}`
    }
    const listItemClassList = `Forum-programme-list-item d-flex flex-column mb-${!isWrapped && !is_last? '5' : '0'}`

    return (
        <div className={ listItemClassList }>
            {/*
                Если у вас редактор кода будет ругаться на set_is_wrapped, что он не используется
                Не верьте ему, все работает, все используется. Видимо редактор кода баг выдает (с JS бывает такое)
             */}
            <WrapButton wrap_button_props={{
                header_text: itemHeader,
                set_is_wrapped: (newValue) => setIsWrapped(newValue)
            }} />
            {
                !isWrapped?
                    <>
                        <span className="regular-text text-center d-flex me-auto mt-1 mb-4">{ place }</span>
                        {
                            timetable.map(item => {
                                return <TimetableListItem key={`timetable_item_${item.id}`} item_data={ item } />
                            })
                        }
                    </>
                    :
                    null
            }
        </div>
    )
}