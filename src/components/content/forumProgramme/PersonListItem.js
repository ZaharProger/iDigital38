import React from "react"

export default function PersonListItem(props) {
    const { name, role } = props.person_data

    return (
        <div className="Person-list-item d-flex mb-1 me-auto">
            <span className="caption-text d-flex flex-row">
                {
                    `${name} - ${role}`
                }
            </span>
        </div>
    )
}