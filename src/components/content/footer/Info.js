import React, {useContext} from "react"

import telegram from "../../../assets/pics/icon/telegram.svg"
import vk from "../../../assets/pics/icon/vk.svg"
import logo from "../../../assets/pics/logo.svg"
import {contentContext} from "../../../context"

export default function Info() {
    const isMobile = useContext(contentContext)

    return (
        <div id="Info" className="w-100 footer-text" style={{
            flexDirection: isMobile? "column" : "row",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"}}>
            <div className={ isMobile? "d-flex me-auto ms-auto" : "" }>
                <a href="https://t.me/+mwjvF2r0mRoyYjY6" target="_blank" rel="noreferrer noopener">
                    <img src={telegram} className="Icon" />
                </a>
                <a href="https://vk.com/polytech_irk" target="_blank" rel="noreferrer noopener">
                    <img src={vk} className="Icon" style={{marginLeft: 30}} />
                </a>
            </div>
            <h2>
                <a href="https://www.istu.edu/" className="footer-text" target="_blank" rel="noreferrer noopener"
                   style={{
                    marginLeft: isMobile? "auto" : 165,
                    marginRight: isMobile? "auto" : 0,
                    fontSize: "0.75em"
                }}>
                    ФГБОУ ВО ИРНИТУ
                </a>
            </h2>
            <img src={logo} onClick={ () => window.scrollTo(0, 0) } />
        </div>
    )
}