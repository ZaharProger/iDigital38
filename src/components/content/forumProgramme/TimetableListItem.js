import React, {useCallback} from "react"

import {HEADERS} from "../../../globalConstants"
import PersonListItem from "./PersonListItem"

export default function TimetableListItem(props) {
    const { time, name, moderators, speakers } = props.item_data
    let itemHeader = time
    if (name != '') {
        itemHeader += `. ${name}`
    }

    const getNestedItems = useCallback((items) => {
        return items.map(item => {
            const personKey = `person_item_${items.indexOf(item)}_${item.id}`
            return <PersonListItem key={ personKey } person_data={ item } />
        })
    }, [])

    return (
        <div className="Timetable-list-item d-flex flex-column mb-1 me-auto">
            <span className="semi-header-text me-auto mb-1">{ itemHeader }</span>
            {
                moderators.length != 0?
                    <>
                        <span className="caption-header-text mb-1 me-auto">{ `${HEADERS.moderators}:` }</span>
                        { getNestedItems(moderators) }
                    </>
                    :
                    null
            }
            {
                speakers.length != 0?
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