import React, {useCallback} from "react"
import {useSelector} from "react-redux"
import {v4 as uuidV4} from "uuid"

import ComponentHeader from "../componentHeader/ComponentHeader"
import {HEADERS} from "../../../globalConstants"
import '../../../styles/gallery.css'
import GalleryItem from "./GalleryItem"

export default function Gallery() {
    const photos = useSelector(state => state.gallery_items)

    const getGalleryItems = useCallback(() => {
        const galleryItems = []

        let isReversed = false
        for (let i = 0; i < photos.length - 1; i += 2) {
            galleryItems.push(
                <GalleryItem key={ `gallery_item_${uuidV4()}` } gallery_item_props={{
                    first: photos[i],
                    second: i + 1 <= photos.length - 1? photos[i + 1] : null,
                    reversed: isReversed
                }} />
            )
            isReversed = !isReversed
        }

        return galleryItems
    }, [photos])

    return (
        <div id="Gallery" className="d-flex flex-column container-gap me-5 ms-5">
            <ComponentHeader header_text={ HEADERS.gallery } />
            <span className="d-flex me-auto mb-2 text-center header-text">
                Смотрите как это было в 2022 году!
            </span>
            {
                getGalleryItems()
            }
            <span className="d-flex ms-auto mb-1 mt-2 text-center regular-text">
                Все фотографии доступны
                <a className="semi-header-text ms-1" href="https://disk.yandex.ru/d/JrTkNyIsiV92ig">по ссылке</a>
            </span>
	    <span className="d-flex ms-auto mb-2 mt-2 text-center regular-text">
                <a className="semi-header-text me-1" href="https://www.youtube.com/watch?v=rZ06tq30NhA">Видео</a>
                о том, как мы развивали ИТ-компетенции школьников и преподавателей
            </span>
        </div>
    )
}
