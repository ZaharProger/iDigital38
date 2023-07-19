import React from "react"

export default function OrganizerForm(props) {
    const { name, role, additional_role, image_uri } = props.item_props

    return(
        <div id="Organizer-form" className="d-flex flex-column justify-content-center">
            <label>ФИО</label>
            <input name="name" type="text" value={ name } />
            <label>Роль</label>
            <input name="role" type="text" value={ role } />
            <label>Дополнительная роль (необязательное поле)</label>
            <input name="additional_role" type="text" value={ additional_role } />
            <label>Фотография (необязательное поле)</label>
            <input name="image_uri" type="text" value={ image_uri } />
            <button type="submit" className="d-flex regular-text pt-1 pb-1 pe-3 ps-3"></button>
        </div>
    )
}