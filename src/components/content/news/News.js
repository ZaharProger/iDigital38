import React from "react"

import ComponentHeader from "../componentHeader/ComponentHeader"
import {HEADERS} from "../../../globalConstants"
import '../../../styles/news.css'


export default function ForumProgramme() {

    return (
        <div id="News" className="d-flex flex-column">
            <ComponentHeader header_text={ HEADERS.news } />
            <div id="news-block" className="regular-text d-flex flex-column px-4 py-4">
                <span>
                    Иркутский политех приглашает студентов и страшеклассников Сибири и Дальнего Востока к участию в региональном конкурсе IT-проектов. Авторы лучших идей получат денежные призы в размере 100 тыс. рублей. Конкурс проводится во второй раз в рамках регионального форума цифровых решений «<span className="purple-letter">i</span>Digital<span className="purple-letter">38</span>». Инициативу поддерживают министерство цифрового развития Приангарья, Иркутская нефтяная компания (ИНК), ГК «Форус», Торгово-промышленная палата Восточной Сибири.
                </span>
            </div>
        </div>
    )
}