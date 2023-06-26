import React, {useEffect, useState} from "react"

import {HEADERS, LIST_TYPES} from "../../globalConstants"
import '../../styles/content-wrap.css'
import '../../styles/classes.css'
import Header from "./header/Header"
import News from "./news/News"
import Carousel from "./carousel/Carousel"
import ForumProgramme from "./forumProgramme/ForumProgramme"
import Footer from "./footer/Footer"
import Gallery from "./gallery/Gallery"
import GalleryItemFullscreenView from "./gallery/GalleryItemFullscreenView"
import Organizers from "./organizers/Organizers"


// Это обертка над всем контентом страницы (я пока хз пихать ли сюда навбар, но
// вообще все содержимое страницы размещать здесь (App будет использоваться для перенаправления по роутам)
export default function ContentWrap() {
    const [fullscreenData, setFullscreenData] = useState({
        is_active: false,
        id: '0'
    })

    useEffect(() => {
        document.querySelector('#Gallery').querySelectorAll('img').forEach(image => {
            image.onclick = () => {
                document.querySelector('body').style.overflow = 'hidden'
                setFullscreenData({
                    is_active: true,
                    id: image.id
                })
            }
        })
        document.querySelectorAll('.Carousel-list').forEach(carousel => {
            if (carousel.parentElement.id == 'event-carousel') {
                carousel.classList.add('neon')
            }
        })
    }, [])

    return (
        <div id="Content-wrap" className="d-flex flex-column h-100">
            <Header/>
            {
                fullscreenData.is_active?
                    <GalleryItemFullscreenView fullscreen_props={{
                        selected_image: fullscreenData.id,
                        close_callback: () => setFullscreenData({
                            is_active: false,
                            id: '0'
                        })
                    }} />
                    :
                    null
            }
            <News/>
            <Organizers/>
            <Gallery />
            <ForumProgramme />
            <Carousel data={ {
                header_text: HEADERS.events,
                list_type: LIST_TYPES.events,
                has_sliders: true,
                first_item: null
            } } />
            <Footer/>
        </div>
    )
}