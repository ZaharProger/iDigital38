import React from "react"

import {convertFirstLetterToLower} from "../../../utils"

export default function PersonListItem(props) {
    const { name, role } = props.person_data

    return (
        <div className="Person-list-item d-flex mb-1">
            <span className="caption-text text-center d-flex flex-row">
                <span className="caption-header-text text-center">{ name }</span>
                {
                `, ${convertFirstLetterToLower(role)}`
                }
            </span>
        </div>
    )
}