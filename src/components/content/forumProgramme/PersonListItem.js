import React from "react"

export default function PersonListItem(props) {
    return (
        <div className="Person-list-item d-flex mb-1 me-auto">
            <span className="caption-text d-flex flex-row">
                {
                    props.person_data
                }
            </span>
        </div>
    )
}