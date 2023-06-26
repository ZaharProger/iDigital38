import React from "react"
import Carousel from "../carousel/Carousel"
import {LIST_TYPES} from "../../../globalConstants"

export default function GalleryItemFullscreenView(props) {
    const { selected_image, close_callback: closeCallback } = props.fullscreen_props

    return (
        <div id="Gallery-item-fullscreen-view" className="position-fixed d-flex flex-column">
            <i className="fa-solid fa-xmark position-fixed d-flex" onClick={ () => {
                document.querySelector('body').style.overflow = 'auto'
                closeCallback()
            } } />
            <Carousel data={ {
                header_text: null,
                list_type: LIST_TYPES.gallery_items,
                has_sliders: false,
                first_item: selected_image
            } } />
        </div>
    )
}