import React from "react"

import {LIST_TYPES} from "../../../globalConstants"
import EventListItem from "../events/EventListItem"

export default function CarouselList(props) {
    const { items, list_type } = props.list_props

    return (
        <div className="Carousel-list carousel-inner">
            {
                items.map(item => {
                    const itemIndex = items.indexOf(item)

                    return list_type === LIST_TYPES.events?
                        <EventListItem key={`event_item_${item.id}`} item_props={{
                            item_data: item,
                            is_active: itemIndex == 0
                        }} />
                        :
                        null
                })
            }
        </div>
    )
}