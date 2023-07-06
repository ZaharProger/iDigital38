import React, {useContext} from "react"
import {useSelector} from "react-redux"

import ComponentHeader from "../componentHeader/ComponentHeader"
import CarouselSliderBox from "./CarouselSliderBox"
import '../../../styles/carousel.css'
import {LIST_TYPES} from "../../../globalConstants"
import CarouselList from "./CarouselList"
import CarouselButtons from "./CarouselButtons"
import {contentContext} from "../../../context"

export default function Carousel(props) {
    const { header_text, list_type, has_sliders, first_item } = props.data
    const isMobile = useContext(contentContext)

    let carouselId
    let margin
    const carouselItems = useSelector(state => {
        switch (list_type) {
            case LIST_TYPES.events:
                margin = 'me-auto ms-auto'
                carouselId = 'event-carousel'
                return state.events
            case LIST_TYPES.gallery_items:
                margin = 'mt-auto mb-auto ms-auto me-auto'
                carouselId = 'gallery-carousel'
                return state.gallery_items
            default:
                carouselId = ''
                margin = 'mt-5'
                return Array()
        }
    })
    const carouselClassList = `carousel slide Carousel d-flex container-gap flex-column ${ margin }`

    return (
        <div id={ carouselId } className={ carouselClassList } data-bs-touch="true"
             data-bs-ride="true">
            {
                typeof header_text === 'string'?
                    <ComponentHeader header_text={ header_text } />
                    :
                    null
            }
            <CarouselList carousel_list_props={{
                items: carouselItems,
                list_type,
                first_item
            }} />
            {
                isMobile? null : <CarouselButtons carousel_id={ carouselId } />
            }
            {
                has_sliders?
                    <CarouselSliderBox slider_box_props={{
                        items: carouselItems,
                        list_type,
                        carousel_id: carouselId,
                        first_item
                    }} />
                    :
                    null
            }
        </div>
    )
}