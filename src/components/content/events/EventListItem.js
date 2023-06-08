import React from "react"

import '../../../styles/events.css'

export default function EventListItem(props) {
    const { item_data, is_active } = props.item_props
    const itemClassList = `Event-list-item d-flex flex-row${is_active? ' active' : ''}`

    return (
        <div className={ itemClassList }>
            <img src={ item_data.image } alt="Мероприятие" />
            <div className="d-flex flex-column justify-content-between p-2">
                <u>{ item_data.name }</u>
                <span>{ item_data.date }</span>
            </div>
        </div>
    )
}