import React from "react"

import '../../../styles/event.css'

export default function EventListItem(props) {
    const { item_data, is_active } = props.item_props
    const itemClassList = `carousel-item Event-list-item${is_active? ' active' : ''}`

    return (
        <div className={ itemClassList }>
            <div className="d-flex flex-row">
                <img src={ item_data.image } alt="Мероприятие" />
                <div className="d-flex flex-column pt-3 pb-3 ps-5 pe-3 w-100">
                    <span className="regular-text text-center mb-5 me-auto ms-auto mt-auto">{ item_data.name }</span>
                    <span className="header-text text-center mt-5 me-auto ms-auto mb-auto">{ item_data.date }</span>
                    <a href={ item_data.link }
                       className="header-text d-flex me-auto ms-auto p-3 item-button">Подробнее</a>
                </div>
            </div>
        </div>
    )
}