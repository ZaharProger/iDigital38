import React from "react"

import TimetableListItem from "./TimetableListItem"
import ReportsBlock from "./ReportsBlock"
import useWrap from "../../../hooks/useWrap"

export default function ForumProgrammeListItem(props) {
    const { item_data, is_last } = props.item_props
    const { date, name, place, timetable, report_table } = item_data
    let itemHeader = date
    if (name != '') {
        itemHeader += `. ${name}`
    }

    const [getState, wrap] = useWrap(itemHeader)
    const listItemClassList = `Forum-programme-list-item d-flex flex-column mb-${!getState() && !is_last? '5' : '0'}`

    return (
        <div className={ listItemClassList }>
            {
                wrap
            }
            {
                !getState()?
                    <div className="d-flex flex-column ps-3">
                        <span className="regular-text text-center d-flex mb-4">{ place }</span>
                        {
                            timetable.map(item => {
                                return <TimetableListItem key={`timetable_item_${item.id}`} item_data={ item } />
                            })
                        }
                        {
                            report_table.map(reportTableItem => {
                                return <ReportsBlock key={ `report_block_${reportTableItem.id}` }
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