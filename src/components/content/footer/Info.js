import React from "react"

import telegram from "../../../assets/pics/icon/telegram.svg"
import vk from "../../../assets/pics/icon/vk.svg"
import logo from "../../../assets/pics/logo.svg"

export default function Info() {
    return (
        <div id="Info" className="w-100 footer-text" style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"}}>
            <div>
                <a href="https://t.me/+mwjvF2r0mRoyYjY6" target="_blank">
                    <img src={telegram} className="Icon" />
                </a>
                <a href="https://vk.com/polytech_irk" target="_blank">
                    <img src={vk} className="Icon" style={{marginLeft: 30}} />
                </a>
            </div>
            <h2>
                <a href="https://www.istu.edu/" className="footer-text" style={{
                    marginLeft: 165,
                    fontSize: "0.75em"
                }}>
                    ФГБОУ ВО ИРНИТУ
                </a>
            </h2>
            <img src={logo} onClick={ () => window.scrollTo(0, 0) } />
        </div>
    )
}