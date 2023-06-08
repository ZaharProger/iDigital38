import React from "react"

export default function Slider(props) {
    const { item_index, is_active } = props.slider_props
    const sliderClassList = `Slider${is_active? ' active' : ''}`

    return (
        <li className={ sliderClassList } data-slide-to={ item_index.toString() }></li>
    )
}