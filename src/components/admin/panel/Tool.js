import React from "react"

export default function Tool(props) {
    const { item: { caption, icon_class } } = props.item_props

    return(
        <div className={ `Tool d-flex flex-row ms-3 p-2` }>
            <i className={ `fa-solid fa-${icon_class} mt-auto mb-auto me-2` } />
            <span className="text-center regular-text d-flex mt-auto mb-auto">
                {
                    caption
                }
            </span>
        </div>
    )
}