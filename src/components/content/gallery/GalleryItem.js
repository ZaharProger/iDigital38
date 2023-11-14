import React from "react"

export default function GalleryItem(props) {
    const { first, second, reversed } = props.gallery_item_props

    return (
        <div className="Gallery-item d-flex flex-row mt-2 mb-2">
            <img id={ first.id } src={ first.image }
                 className={ `d-flex col-6${ !reversed? ' flex-grow-1' : '' }` } />
            {
                second !== null?
                    <img id={ second.id } src={ second.image }
                         className={ `d-flex col-6${ reversed? ' flex-grow-1' : '' }` } />
                    :
                    null
            }
        </div>
    )
}