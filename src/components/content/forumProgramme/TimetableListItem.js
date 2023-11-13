import React, {useCallback} from "react"
import {v4 as uuidV4} from "uuid"

import {HEADERS} from "../../../globalConstants"
import PersonListItem from "./PersonListItem"
import {prepareTime} from "../../../utils"

export default function TimetableListItem(props) {
    const { name, time_start, time_end, moderators, speakers } = props.item_data

    let itemHeader = `${prepareTime(time_start)}`
    itemHeader += time_end !== null && time_end != 0? ` - ${prepareTime(time_end)}. ${name}` : `. ${name}`

    const getNestedItems = useCallback((items) => {
        return items.split('\n').map(item => {
            const personKey = `day_timetable_person_item_${uuidV4()}`
            return <PersonListItem key={ personKey } person_data={ item } />
        })
    }, [])

    return (
        <div className="Timetable-list-item d-flex flex-column mb-1 me-auto">
            <span className="semi-header-text me-auto mb-1">{ itemHeader }</span>
            {
                moderators !== null && moderators !== ''?
                    <>
                        <span className="caption-header-text mb-1 me-auto">{ `${HEADERS.moderators}:` }</span>
                        { getNestedItems(moderators) }
                    </>
                    :
                    null
            }
            {
                speakers !== null && speakers !== ''?
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