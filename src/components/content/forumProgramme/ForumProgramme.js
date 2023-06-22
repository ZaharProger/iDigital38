import React from "react"
import {useSelector} from "react-redux"

import ComponentHeader from "../componentHeader/ComponentHeader"
import {HEADERS} from "../../../globalConstants"
import '../../../styles/forum-programme.css'
import ForumProgrammeListItem from "./ForumProgrammeListItem"


export default function ForumProgramme() {
    const items = useSelector(state => state.forum_programme)

    return (
        <div id="Forum-programme" className="d-flex flex-column mb-5 ms-4 me-4">
            <ComponentHeader header_text={ HEADERS.forum_programme } />
            <div id="forum-programme-list" className="d-flex flex-column pe-4 ps-4 pt-3 pb-3">
                {
                    items.map(item => {
                        return <ForumProgrammeListItem
                            key={`forum_programme_item_${item.id}`} item_props={{
                                item_data: item,
                                is_last: items.indexOf(item) == items.length - 1
                        }} />
                    })
                }
            </div>
        </div>
    )
}