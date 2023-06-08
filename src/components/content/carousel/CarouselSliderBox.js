import React from "react"

import Slider from "./Slider"
import {LIST_TYPES} from "../../../globalConstants";

export default function CarouselSliderBox(props) {
    const { items, list_type, carousel_id } = props.slider_box_props

    return (
        <div className="Carousel-slider-box carousel-indicators d-flex flex-row me-auto ms-auto p-2">
            {
                items.map(item => {
                    const itemIndex = items.indexOf(item)
                    const sliderKey = `${list_type === LIST_TYPES.events? 'event' : ''}_slider_${itemIndex}`

                    return <Slider key={ sliderKey } slider_props={{
                        item_index: itemIndex,
                        is_active: itemIndex == 0,
                        carousel_id
                    }}/>
                })
            }
        </div>
    )
}