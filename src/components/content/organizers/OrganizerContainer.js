import React, {useContext} from "react"

import {contentContext} from "../../../context"

export default function OrganizerContainer(props) {
    const { item_data: { name, role, additional_role, image_uri }, is_last } = props.organizer_props
    const isMobile = useContext(contentContext)

    return(
        <div className={ `Organizer-container flex-${isMobile? 'column' : 'row'}${is_last? '' : ' mb-5'}` }>
            {
                image_uri !== null?
                    <img src={ image_uri } alt="Organizer" className="organizer-image" style={{
                        width: 200,
                        height: 200,
                        objectFit: "cover",
                        borderRadius: "50%",
                        marginLeft: 30,
                        marginRight: 30,
                        overflow: "hidden"
                    }} />
                    :
                    null
            }
            <div className={ `organizer-text${isMobile? ' text-center' : ''}` } style={{marginLeft: isMobile? 0 : 40}}>
                {
                    additional_role !== null && additional_role !== ''?
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