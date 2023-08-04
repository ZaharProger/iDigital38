import React from "react"

import {HEADERS} from "../../../globalConstants"
import ReportsTable from "./ReportsTable"
import PersonListItem from "./PersonListItem"
import useWrap from "../../../hooks/useWrap";

export default function ReportsBlock(props) {
    const { name, place, moderators, reports } = props.item_data
    const [getState, wrap] = useWrap(name)

    return (
        <div className="Reports-block d-flex flex-column mt-4">
            {
                wrap
            }
            {
                !getState()?
                    <div className="d-flex flex-column ps-3">
                        <span className="regular-text me-auto mb-1">{ place !== null? place : '' }</span>
                        {
                            moderators !== null?
                                <>
                                    <span className="caption-header-text mb-1 me-auto">
                                        {
                                        `${HEADERS.moderators}:`
                                        }
                                    </span>
                                    {
                                        moderators.split('\n').map(item => {
                                            const personKey = `report_block_person_item_${item}`
                                            return <PersonListItem key={ personKey } person_data={ item } />
                                        })
                                    }
                                </>
                                :
                                null
                        }
                        {
                            reports.length != 0?
                                <ReportsTable table_props={{
                                    headers: [
                                        HEADERS.number,
                                        HEADERS.report_name,
                                        HEADERS.time,
                                        HEADERS.main_speakers
                                    ],
                                    items: reports
                                }} />
                                :
                                <span className="semi-header-text">
                                    Программа формируется
                                </span>
                        }
                    </div>
                    :
                    null
            }
        </div>
    )
}