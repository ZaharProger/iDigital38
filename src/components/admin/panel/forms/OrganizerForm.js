import React, {useCallback, useState} from "react"

import {HOST} from "../../../../globalConstants"
import useImage from "../../../../hooks/useImage"

export default function OrganizerForm(props) {
    const { data, has_id } = props.item_props
    const isDefined = data !== undefined

    const getImage = useImage(isDefined && data.image_uri !== null? `${HOST}${data.image_uri}` : null)
    const [loadedLocallyImage, setLoadedLocallyImage] = useState(null)

    const updateImage = useCallback(() => {
        const form = document.querySelector('#Organizer-form')
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