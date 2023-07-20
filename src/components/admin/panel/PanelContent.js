import React, {useCallback, useEffect} from "react"
import {useLocation, useNavigate} from "react-router-dom"

import {ACTIVE_PANELS, HOST} from "../../../globalConstants"
import EventView from "./views/EventView"
import OrganizerView from "./views/OrganizerView"
import EventForm from "./forms/EventForm"
import OrganizerForm from "./forms/OrganizerForm"
import useApi from "../../../hooks/useApi"
import useEndpoint from "../../../hooks/useEndpoint"

export default function PanelContent(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const performApiCall = useApi()
    let { active_panel, data, is_single, id_from_url } = props.panel_props
    const endpoint = useEndpoint(active_panel, false)

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
                    content = data.sort((first, second) => first.date - second.date).map(item => {
                        return <EventView key={ `event_${item.id}` } item_props={{
                            item_data: item,
                            is_last: data.indexOf(item) == data.length - 1
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
                    content = data.sort((first, second) => first.order - second.order).map(item => {
                        return <OrganizerView key={ `organizer_${item.id}` } item_props={{
                            item_data: item,
                            is_last: data.indexOf(item) == data.length - 1
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
        const viewItems = Array.from(document.getElementsByClassName('view-item'))
        viewItems.forEach(viewItem => {
            viewItem.addEventListener('click', () => {
                navigate(`${location.pathname}/${data[viewItems.indexOf(viewItem)].id}`)
            })

            viewItem.addEventListener('mouseover', () => {
                viewItem.classList.add('selected-view-item')
            })

            viewItem.addEventListener('mouseleave', () => {
                document.querySelectorAll('.view-item').forEach(anotherItem => {
                    anotherItem.classList.remove('selected-view-item')
                })
            })
        })

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

                performApiCall(`${HOST}/${endpoint}`, requestMethod, requestBody, null).then(responseData => {
                    console.log(responseData)
                })
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