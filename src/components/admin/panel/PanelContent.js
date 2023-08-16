import React, {useCallback, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {v4 as uuidV4} from "uuid"
import {useSelector} from "react-redux"

import {ACTIVE_PANELS, HOST} from "../../../globalConstants"
import EventView from "./views/EventView"
import OrganizerView from "./views/OrganizerView"
import EventForm from "./forms/EventForm"
import OrganizerForm from "./forms/OrganizerForm"
import useApi from "../../../hooks/useApi"
import useEndpoint from "../../../hooks/useEndpoint"
import useValidation from "../../../hooks/useValidation"
import ProgrammeDayView from "./views/ProgrammeDayView"
import ProgrammeDayForm from "./forms/ProgrammeDayForm"
import '../../../styles/panel-content.css'
import {mapBlockFormsToObjects, mapMainFormToObject, mapTimetableFormsToObjects} from "../../../utils"

export default function PanelContent(props) {
    const navigate = useNavigate()

    const performApiCall = useApi()
    const validate = useValidation()
    let { active_panel, data, is_single, id_from_url, controlled_callback } = props.panel_props
    const { backend_endpoint, frontend_endpoint } = useEndpoint(active_panel, false)

    const removedTimetable = useSelector(state => state.removed_timetable)
    const removedBlocks = useSelector(state => state.removed_blocks)
    const removedReports = useSelector(state => state.removed_reports)

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
                    content = data.map((item, index) => {
                        return <EventView key={ `event_${uuidV4()}` } item_props={{
                            item_data: item,
                            is_last: index == data.length - 1,
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
                    content = data.map((item, index) => {
                        return <OrganizerView key={ `organizer_${uuidV4()}` } item_props={{
                            item_data: item,
                            is_last: index == data.length - 1,
                            is_static: false
                        }} />
                    })
                }
                break
            case ACTIVE_PANELS.forum_programme:
                if (is_single){
                    content = <ProgrammeDayForm item_props={{
                        data: data[0],
                        has_id: id_from_url !== undefined
                    }} />
                }
                else {
                    content = data.map((item, index) => {
                        return <ProgrammeDayView key={ `programme_day_${uuidV4()}` } item_props={{
                            item_data: item,
                            is_last: index == data.length - 1,
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
    }, [active_panel, data, id_from_url])

    const validateFields = useCallback((fields, form) => {
        const validationResult = validate(fields, (inputValue) =>
            !RegExp(/^\s*$/).test(inputValue))

        form.querySelectorAll('input').forEach(input => {
            input.classList.remove('error')

            if (validationResult.includes(input)) {
                input.classList.add('error')
            }
        })

        return validationResult.length == 0
    }, [data])

    const getFormData = useCallback((form, requestMethod) => {
        const formData = new FormData(form)

        if (requestMethod == 'PUT') {
            formData.append('id', data[0].id)
        }
        if (formData.has('date')) {
            const dateTimestamp = new Date(formData.get('date')).getTime() / 1000
            formData.set('date', dateTimestamp.toString())
        }
        if (formData.has('image_uri') && formData.get('image_uri').size == 0 &&
            form.querySelector('img').getAttribute('src') != '') {
            formData.delete('image_uri')
        }

        return formData
    }, [data])

    const getJsonData = useCallback((form, requestMethod) => {
        const jsonData = mapMainFormToObject(data.length != 0? data[0] : undefined)
        if (requestMethod == 'PUT') {
            jsonData['removed_timetable'] = removedTimetable
            jsonData['removed_blocks'] = removedBlocks
            jsonData['removed_reports'] = removedReports
        }

        jsonData.day_timetable = data.length != 0?
            mapTimetableFormsToObjects(data[0].day_timetable) : []
        jsonData.day_blocks = data.length != 0?
            mapBlockFormsToObjects(data[0].day_blocks) : []

        return JSON.stringify(jsonData)
    }, [data])

    useEffect(() => {
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

                if (validateFields(inputsToValidate, form)) {
                    const requestMethod = id_from_url !== undefined? 'PUT' : 'POST'
                    const requestBody = active_panel === ACTIVE_PANELS.forum_programme?
                        getJsonData(form ,requestMethod) : getFormData(form, requestMethod)
                    const requestHeaders = active_panel === ACTIVE_PANELS.forum_programme?
                        { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'akjgorwgijeori' } :
                        { 'ngrok-skip-browser-warning': 'akjgorwgijeori' }

                    const submitButton = form.querySelector('.submit-button')
                    const prevButtonText = submitButton.innerText
                    submitButton.innerText = 'Отправка данных...'
                    submitButton.disabled = true

                    performApiCall(`${HOST}/${backend_endpoint}`, requestMethod, requestBody, requestHeaders)
                        .then(responseData => {
                            submitButton.innerText = prevButtonText
                            submitButton.disabled = false

                            if (responseData.status == 200) {
                                navigate(frontend_endpoint)
                            }
                            else {
                                const warningMessage = responseData.status != 500? responseData.data.message :
                                    'Произошла внутренняя ошибка сервера. Пожалуйста, повторите запрос позже'
                                controlled_callback(warningMessage)
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