import React, {useContext} from "react"

import nerpa_intro from "../../../assets/pics/nerpa_intro.svg"
import '../../../styles/salutation.css'
import {contentContext} from "../../../context"

export default function Salutation() {
    const isMobile = useContext(contentContext)

    return (
        <div id="Salutation" className="container-gap pt-5 d-flex">
            <div className={ `d-flex m-auto flex-${isMobile? 'column' : 'row'}` }>
                <img src={nerpa_intro} id="NerpaIntro" className="d-flex" style={{
                    width: isMobile? 300 : 500,
                    height: isMobile? 300 : 500,
                    margin: isMobile? "70px auto auto auto" : "auto"
                }} />
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
                    <h2 className="me-auto ms-auto mb-2" style={{
                        marginTop: isMobile? 0 : 250
                    }}>2023</h2>
                    <span className="mt-auto me-auto">ИРНИТУ приглашает молодежь<br />Сибири и Дальнего востока к
                    <br />участию в конкурсе IT-проектов</span>
                </div>
            </div>
        </div>
    )
}