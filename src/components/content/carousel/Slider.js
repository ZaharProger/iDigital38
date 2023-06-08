import React from "react"

export default function Slider(props) {
    const { item_index, is_active, carousel_id } = props.slider_props
    const sliderClassList = `Slider m-2${is_active? ' active' : ''}`

    return (
        <button type="button" className={ sliderClassList } data-bs-target={ `#${carousel_id}` }
                data-bs-slide-to={ item_index.toString() }></button>
    )
}