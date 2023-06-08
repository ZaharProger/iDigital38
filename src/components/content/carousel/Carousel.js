import React from "react"
import {useSelector} from "react-redux"

import ComponentHeader from "../componentHeader/ComponentHeader"
import CarouselSliderBox from "./CarouselSliderBox"
import '../../../styles/carousel.css'
import {LIST_TYPES} from "../../../globalConstants"
import CarouselList from "./CarouselList";

export default function Carousel(props) {
    const { header_text, list_type } = props.data
    let containerMargin = [0, 1, 2, 3, 4, 5].includes(props.data.container_margin)?
        props.data.container_margin : 3

    const carouselItems = useSelector(state => {
        return list_type === LIST_TYPES.events? state.events : state.forum_programme
    })
    const carouselId = list_type === LIST_TYPES.events? 'event-carousel' : 'forum-programme-carousel'
    const carouselClassList = `Carousel carousel slide d-flex flex-column mb-${containerMargin}`

    return (
        <div id={ carouselId } className={ carouselClassList } data-bs-ride="carousel">
            <ComponentHeader header_text={ header_text } />
            <CarouselList list_props={{
                items: carouselItems,
                list_type
            }} />
            <CarouselSliderBox slider_box_props={{
                items: carouselItems,
                list_type,
                carousel_id: carouselId
            }} />
        </div>
    )
}