import React from "react"

import {HOST} from "../../../../globalConstants"

export default function OrganizerView(props) {
    const { item_data: { name, role, additional_role, image_uri } } = props.item_props

    return(
        <div className={ `Organizer-view d-flex flex-row p-2 view-item align-items-center` }>
            {
                image_uri !== null?
                    <img src={ `${HOST}/${image_uri}` } alt='event' className="me-2" />
                    :
                    null
            }
            <div className="d-flex flex-column">
                <span className="table-main-data-text">{ name }</span>
                {
                    additional_role !== null?
                        <span className="table-main-data-text mt-1">{ additional_role }</span>
                        :
                        null
                }
            </div>
            <span className="table-main-data-text ms-auto">{ role  }</span>
        </div>
    )

}