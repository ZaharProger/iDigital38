import React from "react"
import {v4 as uuidV4} from "uuid"

import ComponentHeader from "../componentHeader/ComponentHeader"
import { HEADERS } from "../../../globalConstants"
import "../../../styles/organizers.css"
import {useSelector} from "react-redux"
import OrganizerContainer from "./OrganizerContainer"


export default function Organizers() {
    const organizers = useSelector(state => state.organizers
        .sort((first, second) => first.order - second.order))

    return (
        <div id="Organizers" className="d-flex flex-column me-auto ms-auto container-gap">
            <ComponentHeader header_text={HEADERS.organizers} />
            {
                organizers.length != 0?
                    <>
                        <div className="organizer-block regular-text d-flex flex-column mb-5 pt-2 pb-2 pe-2 ps-2">
                            <OrganizerContainer key={ `organizer_${uuidV4()}` } organizer_props={{
                                item_data: organizers[0],
                                is_last: true
                            }} />
                        </div>
                        <div className="organizer-block regular-text d-flex flex-column mb-5 pt-3 pb-3 pe-2 ps-2">
                            {
                                organizers.slice(1).map((organizer, index) => {
                                    return <OrganizerContainer key={ `organizer_${uuidV4()}` } organizer_props={{
                                        item_data: organizer,
                                        is_last: index == organizers.length - 1
                                    }} />
                                })
                            }
                        </div>
                    </>
                    :
                    null
            }
        </div>
    );}

