import React, {useCallback, useEffect} from "react"
import {useLocation, useNavigate} from "react-router-dom"

import {ACTIVE_PANELS} from "../../../globalConstants"
import EventView from "./views/EventView"
import OrganizerView from "./views/OrganizerView"
import EventForm from "./forms/EventForm"
import OrganizerForm from "./forms/OrganizerForm"

export default function PanelContent(props) {
    const navigate = useNavigate()
    const location = useLocation()
    let { active_panel, data, is_single } = props.panel_props

    const getContent = useCallback(() => {
        let content

        switch (active_panel) {
            case ACTIVE_PANELS.events:
                if (is_single) {
                    content = <EventForm item_props={ data } />
                }
                else {
                    data = data instanceof Array? data.sort((first, second) =>
                        first.date - second.date) : Array()
                    content = data.map(item => {
                        return <EventView key={ `event_${item.id}` } item_props={{
                            item_data: item,
                            is_last: data.indexOf(item) == data.length - 1
                        }} />
                    })
                }
                break
            case ACTIVE_PANELS.organizers:
                if (is_single) {
                    content = <OrganizerForm item_props={ data } />
                }
                else {
                    data = data instanceof Array? data.sort((first, second) =>
                        first.order - second.order) : Array()
                    content = data.map(item => {
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
                navigate(`${location.pathname}/${data[viewItems.indexOf(viewItem)].id}`, {
                    state: {
                        panel: active_panel
                    }
                })
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
    }, [data])

    return(
        <div id="Panel-content" className="d-flex flex-column me-auto ms-auto mb-auto mt-3 w-100">
            {
                getContent()
            }
        </div>
    )
}