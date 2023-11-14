import React, {useContext} from "react"

import telegram from "../../../assets/pics/icon/telegram.svg"
import vk from "../../../assets/pics/icon/vk.svg"
import logo from "../../../assets/pics/logo.svg"
import forus_logo from '../../../assets/pics/icon/forus.png'
import istu_logo from '../../../assets/pics/icon/istu.png'
import mindigit_logo from '../../../assets/pics/icon/mindigit.png'

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
                <a href="https://vk.com/club222512567" target="_blank" rel="noreferrer noopener">
                    <img src={vk} className="Icon" style={{marginLeft: 30}} />
                </a>
            </div>
            <h2 className={`d-flex align-items-center justify-content-center flex-${isMobile? 'column' : 'row'}`}>
                <a href="https://www.istu.edu/" className="footer-text"
                   target="_blank" rel="noreferrer noopener"
                   style={{
                    marginLeft: isMobile? "auto" : 165,
                    marginRight: isMobile? 20 : 0,
                }}>
                    <img src={istu_logo} />
                </a>
                <a href="https://www.forus.ru/" className="footer-text"
                   target="_blank" rel="noreferrer noopener"
                   style={{
                       marginLeft: isMobile? "auto" : 165,
                       marginRight: isMobile? 20 : 0,
                   }}>
                    <img src={forus_logo} />
                </a>
                <a href="https://irkobl.ru/sites/digital/" className="footer-text"
                   target="_blank" rel="noreferrer noopener"
                   style={{
                       marginLeft: isMobile? "auto" : 165,
                       marginRight: isMobile? "auto" : 0,
                   }}>
                    <img src={mindigit_logo} />
                </a>
            </h2>
            <img src={logo} onClick={ () => window.scrollTo(0, 0) } />
        </div>
    )
}