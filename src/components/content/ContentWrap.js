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
import RegisterForm from "./registerForm/RegisterForm"
import FundingModal from "./fundingModal/FundingModal"


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

    const [isAttention, setIsAttention] = useState(false)
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

    useEffect(() => {
        const attention = document.getElementById('attention')
        if (attention !== null) {
            setTimeout(() => {
                setIsAttention(true)
                attention.style.animation = 'attention-reveal 0.3s ease-out 0s 1 forwards'
            }, 1000)
            attention.onclick = () => {
                setIsAttention(false)
                document.getElementById('event-carousel').scrollIntoView({
                    block: 'center',
                    inline: 'center'
                })
            }
        }
    }, [isMobile])

    return (
        <contentContext.Provider value={ isMobile }>
            <div id="Content-wrap" className="d-flex flex-column h-100">
                {/*<div id="attention"*/}
                {/*     style={{backgroundColor: 'red', zIndex: '10000', display: isAttention? 'flex' : 'none'}}*/}
                {/*     className="flex-column position-fixed w-100 pt-3 pb-2 pe-4 ps-4 error text-center">*/}
                {/*    <span className="semi-header-text d-flex text-center m-auto">*/}
                {/*        ВНИМАНИЕ!*/}
                {/*        <br />*/}
                {/*        К сожалению, по техническим причинам форум переносится!*/}
                {/*        <br />*/}
                {/*        Новые даты форума 27.11.2023 - 28.11.2023*/}
                {/*        <br />*/}
                {/*        Пока вы можете принять участие в наших мероприятиях и прокачать IT скиллы!*/}
                {/*    </span>*/}
                {/*    <span className="regular-text d-flex me-auto ms-auto mt-3 text-center">*/}
                {/*        (нажмите на это сообщение, чтобы перейти к мероприятиям)*/}
                {/*    </span>*/}
                {/*</div>*/}
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
                <ForumProgramme />
                <RegisterForm />
                <Carousel data={ {
                    header_text: HEADERS.past_events,
                    list_type: LIST_TYPES.events,
                    has_sliders: true,
                    first_item: null
                } } />
                <Gallery />
                <Footer/>
                <FundingModal />
            </div>
        </contentContext.Provider>
    )
}
