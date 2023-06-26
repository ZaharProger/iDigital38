
import React from "react";
import ComponentHeader from "../componentHeader/ComponentHeader";
import { HEADERS } from "../../../globalConstants";
import "../../../styles/organizers.css";
import sitnikov from "../../../assets/pics/organizers/sitnikov.png";
import korniakov from "../../../assets/pics/organizers/korniakov.png";
import shevtsova from "../../../assets/pics/organizers/shevtsova.png";
import rymorenko from "../../../assets/pics/organizers/rymorenko.png";
import govorkov from "../../../assets/pics/organizers/govorkov.png";


export default function Organizers() {
    return (
        <div id="News" className="d-flex flex-column">
            <ComponentHeader header_text={HEADERS.organizers} />
            <div id="news-block" className="regular-text d-flex flex-column px-4 py-4 mb-5">

            <div className="organizer-container">
                <img src={sitnikov} alt="Organizer" className="organizer-image" />
                <div className="organizer-text">
                    <h2 style={{marginTop: 30, fontSize: 22, fontWeight: "bold"}}> Председатель: </h2>
                    <h3 style={{marginTop: 15, fontSize: 18, fontWeight: "bold"}}> Ситников Руслан Леонидович  </h3>
                    <h3 style={{marginTop: -6, fontSize: 18, fontWeight: "bold"}}> Первый заместитель Председателя Правительства Иркутской области </h3>

                </div>
            </div>
        </div>

            <div id="news-block" className="regular-text d-flex flex-column px-4 py-4 mb-5">

                <div className="organizer-container mb-4">
                    <img src={korniakov} alt="Organizer" className="organizer-image" />
                    <div className="organizer-text">
                        <h2 style={{marginTop: 30, fontSize: 22, fontWeight: "bold"}}> Зам. председателя: </h2>
                        <h3 style={{marginTop: 15, fontSize: 18, fontWeight: "bold"}}> Корняков Михаил Викторович  </h3>
                        <h3 style={{marginTop: -6, fontSize: 18, fontWeight: "bold"}}> Ректор, Иркутский национальный исследовательский технический университет </h3>

                    </div>
                </div>

                <div className="organizer-container mb-4">
                    <img src={shevtsova} alt="Organizer" className="organizer-image" />
                    <div className="organizer-text">
                        <h3 style={{marginTop: 15, fontSize: 18, fontWeight: "bold"}}> Шевцова Ирина Леонидовна  </h3>
                        <h3 style={{marginTop: -6, fontSize: 18, fontWeight: "bold"}}> Председатель Совета Директоров, Группа компаний "Форус" </h3>

                    </div>
                </div>
                <div className="organizer-container mb-4">
                    <img src={rymorenko} alt="Organizer" className="organizer-image" />
                    <div className="organizer-text">
                        <h3 style={{marginTop: 15, fontSize: 18, fontWeight: "bold"}}> Рыморенко Игорь Александрович  </h3>
                        <h3 style={{marginTop: -6, fontSize: 18, fontWeight: "bold"}}> Министр, Министерство цифрового развития и связи Иркутской области </h3>

                    </div>
                </div>
                <div className="organizer-container mb-4">
                    <img src={govorkov} alt="Organizer" className="organizer-image" />
                    <div className="organizer-text">
                        <h3 style={{marginTop: 15, fontSize: 18, fontWeight: "bold"}}> Говорков Алексей Сергеевич  </h3>
                        <h3 style={{marginTop: -6, fontSize: 18, fontWeight: "bold"}}> Директор, Институт информационных технологий и анализа данных ИРНИТУ </h3>

                    </div>
                </div>
            </div>
        </div>
    );
}
