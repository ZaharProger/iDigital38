import React, {useContext} from "react"

import '../../../styles/event.css'
import {contentContext} from "../../../context"

export default function EventListItem(props) {
    const { item_data, is_active } = props.item_props
    const itemClassList = `carousel-item Event-list-item${is_active? ' active' : ''}`

    const isMobile = useContext(contentContext)
    const eventCaptionClasslist = isMobile? 'd-flex flex-column pt-3 me-auto ms-auto pb-3' :
        'd-flex flex-column pt-3 pb-3 ps-5 pe-3 w-100'

    return (
        <div className={ itemClassList }>
            <div className={ `d-flex flex-${isMobile? 'column' : 'row'}` }>
                <img src={ item_data.image } alt="Мероприятие" style={{
                    borderRadius: 30,
                    margin: isMobile? "15px auto auto auto" : "auto",
                    width: isMobile? 300 : 600,
                    height: isMobile? 200 : 350
                }} />
                <div className={ eventCaptionClasslist }>
                    <span className="regular-text text-center mb-5 me-auto ms-auto mt-auto">{ item_data.name }</span>
                    <span className="header-text text-center mt-5 me-auto ms-auto mb-auto">{ item_data.date }</span>
                    <a href={ item_data.link }
                       className="header-text d-flex me-auto ms-auto mt-4 p-3 item-button">Подробнее</a>
                </div>
            </div>
        </div>
    )
}