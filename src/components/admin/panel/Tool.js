import React from "react"

export default function Tool(props) {
    const { item: { caption, icon_class }, is_last } = props.item_props

    return(
        <div className={ `Tool d-flex flex-row me-${is_last? '0' : '3'} p-2` }>
            <i className={ `fa-solid fa-${icon_class} mt-auto mb-auto me-2` } />
            <span className="text-center regular-text d-flex mt-auto mb-auto">
                {
                    caption
                }
            </span>
        </div>
    )
}