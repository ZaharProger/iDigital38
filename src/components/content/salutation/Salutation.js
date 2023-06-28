import React from "react"

import nerpa_intro from "../../../assets/pics/nerpa_intro.svg"
import '../../../styles/salutation.css'

export default function Salutation() {
    return (
        <div id="Salutation" className="container-gap pt-5 d-flex">
            <div className="d-flex m-auto">
                <img src={nerpa_intro} id="NerpaIntro" />
                <div style={{
                    fontFamily: "hisqaida_2018bold",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    textAlign: "center",
                    gap: 10,
                    margin: "auto"
                }}>
                    <h2 className="me-auto ms-auto mb-2">2023</h2>
                    <span className="mt-auto me-auto">ИРНИТУ приглашает молодежь<br />Сибири и Дальнего востока к
                    <br />участию в конкурсе IT-проектов</span>
                </div>
            </div>
        </div>
    )
}