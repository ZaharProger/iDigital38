import React from "react"

import {HOST} from "../../../../globalConstants"

export default function EventView(props) {
    const { item_data: { name, date, ref, image_uri }, is_last } = props.item_props
    const convertedDate = new Date(date * 1000).toLocaleDateString()

    return(
        <div className={ `Event-view d-flex flex-row p-2 view-item mb-${is_last? '0' : '3'} align-items-center` }>
            {
                image_uri !== null?
                    <img src={ `${HOST}/${image_uri}` } alt='event' className="me-2" />
                    :
                    null
            }
            <span className="table-main-data-text">{ name }</span>
            <span className="table-main-data-text ms-auto me-4">{ convertedDate }</span>
            <a className="table-main-data-text" href={ ref }>Ссылка на мероприятие</a>
        </div>
    )
}