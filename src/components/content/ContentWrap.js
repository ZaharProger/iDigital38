import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"

import {ACTIVE_PANELS, HEADERS, LIST_TYPES} from "../../globalConstants"
import '../../styles/content-wrap.css'
import Header from "./header/Header"
import News from "./news/News"
import Carousel from "./carousel/Carousel"
import ForumProgramme from "./forumProgramme/ForumProgramme"
import Footer from "./footer/Footer"
import Gallery from "./gallery/Gallery"
import GalleryItemFullscreenView from "./gallery/GalleryItemFullscreenView"
import Organizers from "./organizers/Organizers"
import Salutation from "./salutation/Salutation"
import {contentContext} from "../../context"
import useApi from "../../hooks/useApi"
import useEndpoint from "../../hooks/useEndpoint"
import setEvents from "../../redux/actions/setEvents"
import setForumProgramme from "../../redux/actions/setForumProgramme"
import setOrganizers from "../../redux/actions/setOrganizers"


// Это обертка над всем контентом страницы (я пока хз пихать ли сюда навбар, но
// вообще все содержимое страницы размещать здесь (App будет использоваться для перенаправления по роутам)
export default function ContentWrap() {
    const performApiCall = useApi()
    const dispatch = useDispatch()

    const eventsEndpoint = useEndpoint(ACTIVE_PANELS.events)
    const organizersEndpoint = useEndpoint(ACTIVE_PANELS.organizers)
    const forumProgrammeEndpoint = useEndpoint(ACTIVE_PANELS.forum_programme)

    const endpoints = [
        {
            endpoint: eventsEndpoint.backend_endpoint,
            callback: (data) => setEvents(data)
        },
        {
            endpoint: organizersEndpoint.backend_endpoint,
            callback: (data) => setOrganizers(data)
        },
        {
            endpoint: forumProgrammeEndpoint.backend_endpoint,
            callback: (data) => setForumProgramme(data)
        }
    ]

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1300)
    const [fullscreenData, setFullscreenData] = useState({
        is_active: false,
        id: '0'
    })

    window.onresize = () => {
        setIsMobile(window.innerWidth <= 1300)
    }

    useEffect(() => {
        document.querySelector('body').style.overflow = 'auto'

        document.querySelectorAll('.Carousel-list').forEach(carousel => {
            if (carousel.parentElement.id == 'event-carousel') {
                carousel.classList.add('neon')
            }
        })

        const floatingButton = document.querySelector('#Floating-button')
        if (floatingButton !== null) {
            floatingButton.querySelectorAll('i').forEach(arrowIcon => {
                arrowIcon.style.transition = '0.3s ease-out'
            })

            floatingButton.addEventListener('mouseover', () => {
                floatingButton.querySelectorAll('i').forEach(arrowIcon => {
                    arrowIcon.style.color = 'var(--border-color)'
                })
            })
            floatingButton.addEventListener('mouseleave', () => {
                floatingButton.querySelectorAll('i').forEach(arrowIcon => {
                    arrowIcon.style.color = 'var(--secondary-color)'
                })
            })
        }

        endpoints.forEach(item => {
            performApiCall(item.endpoint, 'GET', null, null).then(responseData => {
                if (responseData.status == 200) {
                    dispatch(item.callback(responseData.data.data))
                }
            })
        })
    }, [])

    useEffect(() => {
    	const gallery = document.querySelector('#Gallery')
        if (gallery !== null) {
            gallery.querySelectorAll('img').forEach(image => {
                image.onclick = () => {
                    document.querySelector('body').style.overflow = 'hidden'
                    setFullscreenData({
                        is_active: true,
                        id: image.id
                    })
                }
            })
        }
    }, [isMobile, fullscreenData])

    return (
        <contentContext.Provider value={ isMobile }>
            <div id="Content-wrap" className="d-flex flex-column h-100">
                <Header />
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
                <Salutation />
                <News/>
                <Organizers />
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
        </contentContext.Provider>
    )
}
