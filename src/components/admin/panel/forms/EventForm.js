import React, {useCallback, useState} from "react"

import {HOST} from "../../../../globalConstants"
import useImage from "../../../../hooks/useImage"

export default function EventForm(props) {
    const { data, has_id } = props.item_props
    const isDefined = data !== undefined
    const editedDate = isDefined? new Date(data.date * 1000).toLocaleDateString('en-CA') : ''

    const getImage = useImage(isDefined && data.image_uri !== null? `${HOST}${data.image_uri}` : null)
    const [loadedLocallyImage, setLoadedLocallyImage] = useState(null)

    const updateImage = useCallback(() => {
        const form = document.querySelector('#Event-form')
        if (form !== null) {
            form.querySelectorAll('input[type=file]').forEach(input => {
                const [file] = input.files
                const previewLabel = document.getElementById('preview-label')

                if (file) {
                    previewLabel.innerText = 'Предпросмотр (файл загружен с устройства)'
                    setLoadedLocallyImage(URL.createObjectURL(file))
                }
                else {
                    previewLabel.innerText = 'Нет данных для предпросмотра'
                    setLoadedLocallyImage('')
                }
            })
        }
    }, [])

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
                   formEncType="multipart/form-data" className="optional"
                   onChange={ () => updateImage() } />
            <label id="preview-label">
                {
                    isDefined && data.image_uri !== null?
                        'Предпросмотр (файл получен с сервера)' : 'Нет данных для предпросмотра'
                }
            </label>
            <img src={ loadedLocallyImage === null? getImage() : loadedLocallyImage } />
            <button type="submit" className="submit-button d-flex regular-text">
                {
                    has_id? 'Сохранить изменения' : 'Создать запись'
                }
            </button>
        </form>
    )
}