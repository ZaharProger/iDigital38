import React from "react"

import Carousel from "./carousel/Carousel"
import {HEADERS, LIST_TYPES} from "../../globalConstants"
import '../../styles/content-wrap.css'

// Это обертка над всем контентом страницы (я пока хз пихать ли сюда навбар, но
// вообще все содержимое страницы размещать здесь (App будет использоваться для перенаправления по роутам)
export default function ContentWrap() {
    return (
        <div id="Content-wrap" className="d-flex flex-column p-2">
            <Carousel data={ {
                header_text: HEADERS.events,
                list_type: LIST_TYPES.events,
                container_margin: 2
            } } />
        </div>
    )
}