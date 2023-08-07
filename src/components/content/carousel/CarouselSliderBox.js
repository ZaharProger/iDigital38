import React from "react"
import {v4 as uuidV4} from "uuid"

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
                items.map((item, index) => {
                    const sliderKey = `${sliderKeyHeader}_slider_${uuidV4()}`

                    return <Slider key={ sliderKey } slider_props={{
                        item_index: index,
                        is_active: first_item !== null? first_item == item.id : index == 0,
                        carousel_id
                    }}/>
                })
            }
        </div>
    )
}