import React from "react"

import footer from "../../../assets/pics/footer.svg"

import '../../../styles/footer.css'
import History from "./History"
import Info from "./Info"
import FloatingButton from "./FloatingButton"
import Contacts from "./Contacts"


export default function Footer(){
    return(
        <div id="Footer" style={{
            backgroundImage: `linear-gradient(var(--primary-color), transparent 80%), url(${footer})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "column",
            marginTop: "auto"
        }}>
            <div className="d-flex flex-row">
                <Contacts />
                <FloatingButton />
            </div>
            <div id="Security_block" className="footer-text" style={{color: "#9B9B9B", }}>
                <span>Копирование и использование материалов, размещенных на данном сайте,
                    без разрешения правообладателя не допускается.<br/>Все права защищены.</span>
            </div>
            <Info />
            <div id="Line"></div>
            <History />
        </div>
    )
}
