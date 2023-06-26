import React from "react"

export default function FullscreenGalleryItem(props) {
    const { item_data, is_active } = props.item_props
    const itemClassList = `carousel-item Fullscreen-gallery-item${is_active? ' active' : ''}`

    return(
        <div className={ itemClassList }>
            <img className="d-block w-100 h-50" src={ item_data.image } alt="Фото из галереи" />
        </div>
    )
}