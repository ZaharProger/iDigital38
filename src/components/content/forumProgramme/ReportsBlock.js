import React from "react"
import {v4 as uuidV4} from "uuid"

import {HEADERS} from "../../../globalConstants"
import ReportsTable from "./ReportsTable"
import PersonListItem from "./PersonListItem"

export default function ReportsBlock(props) {
    const { name, place, target_audience, moderators, reports } = props.item_data

    return (
        <div className="Reports-block d-flex flex-column mt-4">
            <span className="semi-header-text me-auto mb-1">{ name }</span>
            <div className="d-flex flex-column ps-3">
                {
                    place !== null && place !== ''?
                        <>
                            <span className="caption-header-text mb-1 me-auto">
                                { `${HEADERS.section_place}:` }
                            </span>
                            <span className="regular-text me-auto mb-1">
                                { place }
                            </span>
                        </>
                        :
                        null
                }
                {
                    target_audience !== null && target_audience !== ''?
                        <>
                            <span className="caption-header-text mb-1 me-auto">
                                { `${HEADERS.target_audience}:` }
                            </span>
                            <span className="regular-text me-auto mb-1">
                                { target_audience }
                            </span>
                        </>
                        :
                        null
                }
                {
                    moderators !== null && moderators !== ''?
                        <>
                                    <span className="caption-header-text mb-1 me-auto">
                                        { `${HEADERS.moderators}:` }
                                    </span>
                            {
                                moderators.split('\n').map(item => {
                                    const personKey = `report_block_person_item_${uuidV4()}`
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
                                HEADERS.event_name,
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
        </div>
    )
}