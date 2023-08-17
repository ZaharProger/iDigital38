import React from "react"

export default function OrganizerView(props) {
    const { item_data: { name, role, additional_role, image_uri }, is_static } = props.item_props
    const viewClasslist = `Organizer-view d-flex flex-row p-2 align-items-center ${is_static? 'view-item-static' : 'view-item'}`

    return(
        <div className={ viewClasslist } draggable={ true }>
            {
                image_uri !== null?
                    <img src={ image_uri } alt='event' className="me-2" />
                    :
                    null
            }
            <div className="d-flex flex-column">
                <span className="table-main-data-text">{ name }</span>
                {
                    additional_role !== null?
                        <span className="table-main-data-text mt-1">{ additional_role }</span>
                        :
                        null
                }
            </div>
            <span className="table-main-data-text ms-auto">{ role  }</span>
        </div>
    )

}