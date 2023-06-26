import React from "react"

import Slider from "./Slider"
import {LIST_TYPES} from "../../../globalConstants";

export default function CarouselSliderBox(props) {
    const { items, list_type, carousel_id, first_item } = props.slider_box_props

    let sliderKeyHeader
    switch (list_type) {
        case LIST_TYPES.events:
            sliderKeyHeader = 'event'
            break
        case LIST_TYPES.gallery_items:
            sliderKeyHeader = 'gallery_items'
            break
        default:
            sliderKeyHeader = 'forum_programme'
            break
    }

    return (
        <div className="Carousel-slider-box carousel-indicators d-flex flex-row me-auto ms-auto p-2">
            {
                items.map(item => {
                    const itemIndex = items.indexOf(item)
                    const sliderKey = `${sliderKeyHeader}_slider_${itemIndex}`

                    return <Slider key={ sliderKey } slider_props={{
                        item_index: itemIndex,
                        is_active: first_item !== null? first_item == item.id : itemIndex == 0,
                        carousel_id
                    }}/>
                })
            }
        </div>
    )
}