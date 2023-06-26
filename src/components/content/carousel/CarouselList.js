import React from "react"

import EventListItem from "../events/EventListItem"
import {LIST_TYPES} from "../../../globalConstants"
import FullscreenGalleryItem from "../gallery/FullscreenGalleryItem"

export default function CarouselList(props) {
    const { items, list_type, first_item } = props.carousel_list_props

    return (
        <div className="carousel-inner Carousel-list">
            {
                items.map(item => {
                    const itemIndex = items.indexOf(item)
                    const itemProps = {
                        item_data: item,
                        is_active: first_item !== null? first_item == item.id : itemIndex == 0
                    }

                    let carouselListItem
                    let itemKey
                    switch (list_type) {
                        case LIST_TYPES.events:
                            itemKey = `event_item_${item.id}`
                            carouselListItem = <EventListItem key={ itemKey } item_props={ itemProps } />
                            break
                        case LIST_TYPES.gallery_items:
                            itemKey = `gallery_item_${item.id}`
                            carouselListItem = <FullscreenGalleryItem key={ itemKey } item_props={ itemProps } />
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