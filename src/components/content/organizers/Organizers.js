import React from "react";
import ComponentHeader from "../componentHeader/ComponentHeader";
import { HEADERS } from "../../../globalConstants";
import "../../../styles/organizers.css";
import {useSelector} from "react-redux";
import OrganizerContainer from "./OrganizerContainer";


export default function Organizers() {
    const organizers = useSelector(state => state.organizers)

    return (
        <div id="Organizers" className="d-flex flex-column me-auto ms-auto container-gap">
            <ComponentHeader header_text={HEADERS.organizers} />
            <div className="organizer-block regular-text d-flex flex-column mb-5 pt-2 pb-2 pe-2 ps-2">
                <OrganizerContainer key={ organizers[0].id } organizer_props={{
                    item_data: organizers[0],
                    is_last: true
                }} />
            </div>
            <div className="organizer-block regular-text d-flex flex-column mb-5 pt-3 pb-3 pe-2 ps-2">
                {
                    organizers.slice(1).map(organizer => {
                        return <OrganizerContainer key={ organizer.id } organizer_props={{
                            item_data: organizer,
                            is_last: organizers.indexOf(organizer) == organizers.length - 1
                        }} />
                    })
                }
            </div>
        </div>
    );}

