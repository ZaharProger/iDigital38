import React from "react"

import EventListItem from "../events/EventListItem"
import {LIST_TYPES} from "../../../globalConstants"

export default function CarouselList(props) {
    const { items, list_type } = props.carousel_list_props

    return (
        <div className="Carousel-list carousel-inner">
            {
                items.map(item => {
                    const itemIndex = items.indexOf(item)

                    let carouselListItem
                    let itemKey
                    switch (list_type) {
                        case LIST_TYPES.events:
                            itemKey = `event_item_${item.id}`
                            carouselListItem = <EventListItem key={ itemKey } item_props={{
                                item_data: item,
                                is_active: itemIndex == 0
                            }} />
                            break
                        default:
                            itemKey = null
                            carouselListItem = null
                            break
                    }

                    return carouselListItem
                })
            }
        </div>
    )
}