import React, {useCallback} from "react"

import {HEADERS} from "../../../globalConstants"
import PersonListItem from "./PersonListItem"
import {prepareTime} from "../../../utils"

export default function TimetableListItem(props) {
    const { name, time_start, time_end, moderators, speakers } = props.item_data

    let itemHeader = `${prepareTime(time_start)}`
    itemHeader += time_end !== null? ` - ${prepareTime(time_end)}. ${name}` : `. ${name}`

    const getNestedItems = useCallback((items) => {
        return items.split('\n').map(item => {
            const personKey = `day_timetable_person_item_${item}`
            return <PersonListItem key={ personKey } person_data={ item } />
        })
    }, [])

    return (
        <div className="Timetable-list-item d-flex flex-column mb-1 me-auto">
            <span className="semi-header-text me-auto mb-1">{ itemHeader }</span>
            {
                moderators !== null?
                    <>
                        <span className="caption-header-text mb-1 me-auto">{ `${HEADERS.moderators}:` }</span>
                        { getNestedItems(moderators) }
                    </>
                    :
                    null
            }
            {
                speakers !== null?
                    <>
                        <span className="caption-header-text mb-1 me-auto">{ `${HEADERS.speakers}:` }</span>
                        { getNestedItems(speakers) }
                    </>
                    :
                    null
            }
        </div>
    )
}