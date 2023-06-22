import React from "react"

import {HEADERS, LIST_TYPES} from "../../globalConstants"
import '../../styles/content-wrap.css'
import '../../styles/classes.css'
import News from "./news/News"
import Carousel from "./carousel/Carousel"
import ForumProgramme from "./forumProgramme/ForumProgramme"
import Footer from "./footer/Footer"

// Это обертка над всем контентом страницы (я пока хз пихать ли сюда навбар, но
// вообще все содержимое страницы размещать здесь (App будет использоваться для перенаправления по роутам)
export default function ContentWrap() {
    return (
        <div id="Content-wrap" className="d-flex flex-column">
            <News/>
            <ForumProgramme />
            <Carousel data={ {
                header_text: HEADERS.events,
                list_type: LIST_TYPES.events,
                container_margin: 3
            } } />
            <Footer/>
        </div>
    )
}