import React from "react"
import {v4 as uuidV4} from "uuid"

import TimetableListItem from "./TimetableListItem"
import ReportsBlock from "./ReportsBlock"
import useWrap from "../../../hooks/useWrap"

export default function ForumProgrammeListItem(props) {
    const { item_data, is_last } = props.item_props
    const { name, place, day_timetable, day_blocks } = item_data

    const [getState, wrap] = useWrap(name)
    const listItemClassList = `Forum-programme-list-item d-flex flex-column mb-${!getState() && !is_last? '5' : '0'}`

    return (
        <div className={ listItemClassList }>
            {
                wrap
            }
            {
                !getState()?
                    <div className="d-flex flex-column ps-3">
                        <span className="regular-text text-center d-flex mb-4">{ place !== null? place : '' }</span>
                        {
                            day_timetable.sort((first, second) => first.time_start - second.time_start).map(item => {
                                return <TimetableListItem key={`timetable_item_${uuidV4()}`} item_data={ item } />
                            })
                        }
                        {
                            day_blocks.map(reportTableItem => {
                                return <ReportsBlock key={ `report_block_${uuidV4()}` }
                                                     item_data={ reportTableItem } />
                            })
                        }
                    </div>
                    :
                    null
            }
        </div>
    )
}