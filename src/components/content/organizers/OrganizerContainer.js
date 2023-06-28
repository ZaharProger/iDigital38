import React from "react"

export default function OrganizerContainer(props) {
    const { item_data: { name, role, additional_role, image }, is_last } = props.organizer_props

    return(
        <div className={ `Organizer-container${is_last? '' : ' mb-5'}` }>
            <img src={image} alt="Organizer" className="organizer-image" />
            <div className="organizer-text">
                {
                    additional_role !== undefined?
                        <h2 className="organizer-heading">{ `${additional_role}:` }</h2>
                        :
                        null
                }
                <h3 className="organizer-subheading">{ name }</h3>
                <h3 className="organizer-description">{ role }</h3>
            </div>
        </div>
    )
}