import React from "react"

export default function EventView(props) {
    const { item_data: { name, date, ref, image_uri }, is_static } = props.item_props
    const convertedDate = new Date(date * 1000).toLocaleDateString()
    const viewClasslist = `Event-view d-flex flex-row p-2 align-items-center ${is_static? 'view-item-static' : 'view-item'}`

    return(
        <div className={ viewClasslist }>
            {
                image_uri !== null?
                    <img src={ image_uri } alt='event' className="me-2" />
                    :
                    null
            }
            <span className="table-main-data-text">{ name }</span>
            <span className="table-main-data-text ms-auto me-4">{ convertedDate }</span>
            <a className="table-main-data-text" href={ ref }
               target="_blank" rel="noopener noreferrer">Ссылка на мероприятие</a>
        </div>
    )
}