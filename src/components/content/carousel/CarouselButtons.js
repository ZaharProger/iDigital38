import React from "react"

export default function CarouselButtons(props) {
    const carouselId = props.carousel_id

    return (
        <div className="Carousel-buttons">
            <button className="carousel-control-prev" type="button" data-bs-target={ `#${carouselId}` }
                    data-bs-slide="prev" name="prev-button">
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={ `#${carouselId}` }
                    data-bs-slide="next" name="next-button">
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    )
}