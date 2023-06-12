import React from "react"

import '../../../styles/event.css'

export default function EventListItem(props) {
    const { item_data, is_active } = props.item_props
    const itemClassList = `Event-list-item carousel-item${is_active? ' active' : ''}`

    return (
        <div className={ itemClassList } data-bs-interval="7000">
            <div className="d-flex flex-row">
                <img src={ item_data.image } alt="Мероприятие" />
                <div className="d-flex flex-column m-auto pe-5 ps-5 pt-3 pb-3">
                    <span className="regular-text text-center mb-5">{ item_data.name }</span>
                    <span className="header-text text-center mt-5">{ item_data.date }</span>
                </div>
            </div>
        </div>
    )
}