import React, {useCallback, useEffect} from "react"
import {useNavigate} from "react-router-dom"

import {ACTIVE_PANELS, HOST} from "../../../globalConstants"
import EventView from "./views/EventView"
import OrganizerView from "./views/OrganizerView"
import EventForm from "./forms/EventForm"
import OrganizerForm from "./forms/OrganizerForm"
import useApi from "../../../hooks/useApi"
import useEndpoint from "../../../hooks/useEndpoint"
import useValidation from "../../../hooks/useValidation"
import ProgrammeDayView from "./views/ProgrammeDayView"

export default function PanelContent(props) {
    const navigate = useNavigate()
    const performApiCall = useApi()
    const validate = useValidation()
    let { active_panel, data, is_single, id_from_url } = props.panel_props
    const { frontend_endpoint, backend_endpoint } = useEndpoint(active_panel, false)

    const getContent = useCallback(() => {
        let content

        switch (active_panel) {
            case ACTIVE_PANELS.events:
                if (is_single) {
                    content = <EventForm item_props={{
                        data: data[0],
                        has_id: id_from_url !== undefined
                    }} />
                }
                else {
                    content = data.map(item => {
                        return <EventView key={ `event_${item.id}` } item_props={{
                            item_data: item,
                            is_last: data.indexOf(item) == data.length - 1,
                            is_static: false
                        }} />
                    })
                }
                break
            case ACTIVE_PANELS.organizers:
                if (is_single) {
                    content = <OrganizerForm  item_props={{
                        data: data[0],
                        has_id: id_from_url !== undefined
                    }} />
                }
                else {
                    content = data.map(item => {
                        return <OrganizerView key={ `organizer_${item.id}` } item_props={{
                            item_data: item,
                            is_last: data.indexOf(item) == data.length - 1,
                            is_static: false
                        }} />
                    })
                }
                break
            case ACTIVE_PANELS.forum_programme:
                if (is_single){
                    return Array()
                }
                else {
                    content = data.map(item => {
                        return <ProgrammeDayView key={ `programme_day_${item.id}` } item_props={{
                            item_data: item,
                            is_last: data.indexOf(item) == data.length - 1,
                            is_static: false
                        }} />
                    })
                }
                break
            default:
                content = Array()
                break
        }

        return content
    }, [active_panel, data])

    useEffect(() => {
        document.querySelectorAll('input').forEach(input => {
            if (input.type === 'file') {
                input.addEventListener('change', () => {
                    const [file] = input.files
                    const previewLabel = document.getElementById('preview-label')

                    if (file) {
                        previewLabel.innerText = 'Предпросмотр (файл загружен с устройства)'
                        input.parentElement.querySelector('img').src = URL.createObjectURL(file)
                    }
                    else {
                        previewLabel.innerText = 'Нет данных для предпросмотра'
                        input.parentElement.querySelector('img').src = ''
                    }
                })
            }
            else {
                input.addEventListener('input', (e) => {
                    input.value = e.target.value
                })
            }
        })

        const form = document.querySelector('form')
        if (form !== null) {
            form.onsubmit = (e) => {
                e.preventDefault()

                let errorMessage = document.getElementById('error-message')
                if (errorMessage !== null) {
                    document.getElementById('Panel-tools').removeChild(errorMessage)
                }

                const inputsToValidate = Array.from(document.getElementsByTagName('input'))
                    .filter(input => !input.classList.contains('optional'))
                const validationResult = validate(inputsToValidate, (inputValue) =>
                    !RegExp(/^\s*$/).test(inputValue))

                form.querySelectorAll('input').forEach(input => {
                    input.classList.remove('error')

                    if (validationResult.includes(input)) {
                        input.classList.add('error')
                    }
                })

                if (validationResult.length == 0) {
                    const requestMethod = id_from_url !== undefined? 'PUT' : 'POST'
                    const requestBody = new FormData(form)

                    if (requestMethod == 'PUT') {
                        requestBody.append('id', id_from_url)
                    }
                    if (requestBody.has('date')) {
                        const dateTimestamp = new Date(requestBody.get('date')).getTime() / 1000
                        requestBody.set('date', dateTimestamp.toString())
                    }
                    if (requestBody.has('image_uri') && requestBody.get('image_uri').size == 0 &&
                        form.querySelector('img').getAttribute('src') != '') {
                        requestBody.delete('image_uri')
                    }

                    const submitButton = form.querySelector('button')
                    const prevButtonText = submitButton.innerText
                    submitButton.innerText = 'Отправка данных...'

                    performApiCall(`${HOST}/${backend_endpoint}`, requestMethod, requestBody, null)
                        .then(responseData => {
                            submitButton.innerText = prevButtonText

                            if (responseData !== null) {
                                navigate(frontend_endpoint)
                            }
                        })
                }
                else {
                    errorMessage = document.createElement('span')
                    errorMessage.id = 'error-message'
                    errorMessage.innerText = 'Заполните все обязательные поля'
                    errorMessage.classList.add(
                        'd-flex', 'me-auto', 'mt-auto',
                        'semi-header-text', 'pt-2', 'pb-2', 'pe-3',
                        'ps-3', 'tool-anim', 'mb-1'
                    )
                    document.getElementById('Panel-tools').appendChild(errorMessage)
                }
            }
        }
    }, [data])

    return(
        <div id="Panel-content" className="d-flex flex-column me-auto ms-auto mb-auto w-100">
            {
                getContent()
            }
        </div>
    )
}