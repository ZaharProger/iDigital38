import React, {useState} from "react"

import {useNavigate} from "react-router-dom"
import useEndpoint from "../../../hooks/useEndpoint"
import {PANEL_TOOLS} from "../../../globalConstants"
import '../../../styles/tool.css'

export default function Tool(props) {
    const navigate = useNavigate()
    const { item: { caption, icon_class, route },
        is_single, active_panel, callback, special_class, special_caption } = props.item_props
    const { frontend_endpoint } = useEndpoint(active_panel)

    const [isSubmit, setIsSubmit] = useState(false)

    const additionalClasslist = is_single? 'me-3' : 'ms-3'
    let toolClasslist = `Tool d-flex flex-row ${additionalClasslist} p-2 mb-1`
    if (special_class !== undefined) {
        toolClasslist += ` ${special_class}`
    }

    return(
        <div className={ toolClasslist }
            onClick={ () => {
                if (route === undefined) {
                    navigate(frontend_endpoint)
                }
                else if (route !== null) {
                    callback()
                    navigate(frontend_endpoint + route)
                }
                else {
                    if (props.item_props.item === PANEL_TOOLS.delete) {
                        if (!isSubmit) {
                            setIsSubmit(true)
                            setTimeout(() => {
                                setIsSubmit(false)
                            }, 10000)
                        }
                        else {
                            callback()
                        }
                    }
                    else if (props.item_props.item === PANEL_TOOLS.create_nested) {
                        callback()
                        document.querySelector(`.${special_class}`).scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                            inline: "nearest"
                        })
                    }
                }
            } }>
            <i className={ `fa-solid fa-${icon_class} mt-auto mb-auto me-2` } />
            <span className="text-center regular-text d-flex mt-auto mb-auto">
                {
                    isSubmit? 'Подтвердить' : special_caption !== undefined? caption + special_caption : caption
                }
            </span>
        </div>
    )
}