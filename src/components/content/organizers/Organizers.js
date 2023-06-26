
import React from "react";
import ComponentHeader from "../componentHeader/ComponentHeader";
import { HEADERS } from "../../../globalConstants";
import "../../../styles/organizers.css";
import sitnikov from "../../../assets/pics/organizers/sitnikov.png";

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
                    <h3 style={{marginTop: -6, fontSize: 18, fontWeight: "bold"}}> Первый заместитель Председателя <br/> Правительства Иркутской области </h3>

                </div>
            </div>
        </div>

            <div id="news-block" className="regular-text d-flex flex-column px-4 py-4 mb-5">

                <div className="organizer-container">
                    <img src={sitnikov} alt="Organizer" className="organizer-image" />
                    <div className="organizer-text">
                        <h2 style={{marginTop: 30, fontSize: 22, fontWeight: "bold"}}> Председатель: </h2>
                        <h3 style={{marginTop: 15, fontSize: 18, fontWeight: "bold"}}> Ситников Руслан Леонидович  </h3>
                        <h3 style={{marginTop: -6, fontSize: 18, fontWeight: "bold"}}> Первый заместитель Председателя <br/> Правительства Иркутской области </h3>

                    </div>
                </div>
            </div>
        </div>
    );
}
