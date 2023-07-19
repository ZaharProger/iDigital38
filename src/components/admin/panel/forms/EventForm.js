import React from "react"

export default function EventForm(props) {
    const { name, date, ref, image_uri } = props.item_props

    return(
        <form id="Event-form" className="d-flex flex-column justify-content-center">
            <label>Название мероприятия</label>
            <input name="name" type="text" value={ name } />
            <label>Дата проведения</label>
            <input name="date" type="date" value={ new Date(date * 1000).toLocaleDateString() } />
            <label>Картинка мероприятия (необязательное поле)</label>
            <input name="image_uri" type="text" value={ image_uri } />
            <label>Ссылка на мероприятие</label>
            <input name="ref" type="text" value={ ref } />
            <button type="submit" className="d-flex regular-text pt-1 pb-1 pe-3 ps-3"></button>
        </form>
    )
}