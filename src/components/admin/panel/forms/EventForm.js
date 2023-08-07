import React from "react"

import {HOST} from "../../../../globalConstants"

export default function EventForm(props) {
    const { data, has_id } = props.item_props
    const isDefined = data !== undefined
    const editedDate = isDefined? new Date(data.date * 1000).toLocaleDateString('en-CA') : ''

    return(
        <form id="Event-form" className="d-flex flex-column justify-content-center">
            <label>Название мероприятия</label>
            <input name="name" type="text" defaultValue={ isDefined? data.name : '' } />
            <label>Дата проведения</label>
            <input name="date" type="date" defaultValue={ editedDate } />
            <label>Ссылка на мероприятие</label>
            <input name="ref" type="text" defaultValue={ isDefined? data.ref : '' } />
            <label>Картинка мероприятия (необязательное поле)</label>
            <input name="image_uri" type="file" accept="image/*"
                   formEncType="multipart/form-data" className="optional" />
            <label id="preview-label">
                {
                    isDefined && data.image_uri !== null?
                        'Предпросмотр (файл получен с сервера)' : 'Нет данных для предпросмотра'
                }
            </label>
            <img src={ isDefined && data.image_uri !== null? `${HOST}/${data.image_uri}` : '' } />
            <button type="submit" className="submit-button d-flex regular-text">
                {
                    has_id? 'Сохранить изменения' : 'Создать запись'
                }
            </button>
        </form>
    )
}