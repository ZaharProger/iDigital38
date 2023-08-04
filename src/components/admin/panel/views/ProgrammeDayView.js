import React from "react"

export default function ProgrammeDayView(props) {
    const { item_data: { name, place }, is_static } = props.item_props
    const viewClasslist = `Programme-day-view d-flex flex-column p-2 align-items-center ${is_static? 'view-item-static' : 'view-item'}`

    return(
        <div className={ viewClasslist }>
            <span className="table-main-data-text me-auto">{ name }</span>
            <span className="table-main-data-text mt-1 me-auto">{ place }</span>
        </div>
    )
}