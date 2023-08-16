import React from "react"

import {HOST} from "../../../../globalConstants"

export default function OrganizerForm(props) {
    const { data, has_id } = props.item_props
    const isDefined = data !== undefined

    return(
        <form id="Organizer-form" className="d-flex flex-column justify-content-center">
            <label>ФИО</label>
            <input name="name" type="text" defaultValue={ isDefined? data.name : '' } />
            <label>Должность</label>
            <input name="role" type="text" defaultValue={ isDefined? data.role : '' } />
            <label>Должность на форуме (необязательное поле)</label>
            <input name="additional_role" type="text"
                   defaultValue={ isDefined? data.additional_role : '' } className="optional" />
            <label>Фотография (необязательное поле)</label>
            <input name="image_uri" type="file" accept="image/*"
                   formEncType="multipart/form-data" className="optional" />
            <label id="preview-label">
                {
                    isDefined && data.image_uri !== null?
                        'Предпросмотр (файл получен с сервера)' : 'Нет данных для предпросмотра'
                }
            </label>
            <img src={ isDefined && data.image_uri !== null? `${HOST}${data.image_uri}` : '' } />
            <button type="submit" className="submit-button d-flex regular-text">
                {
                    has_id? 'Сохранить изменения' : 'Создать запись'
                }
            </button>
        </form>
    )
}