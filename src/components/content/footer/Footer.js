import React from "react"

import footer from "../../../assets/pics/footer.svg"
import vk from "../../../assets/pics/icon/vk.svg"
import telegram from "../../../assets/pics/icon/telegram.svg"
import logo from "../../../assets/pics/logo.svg"

import '../../../styles/footer.css'


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
            <div id="Contacts"> 
                <h1 className="footer-text"> Контакты </h1>
            </div>
            <div id="Contact_block">
                <h2 className="footer-text"> Дмитрий Салко </h2>
                <h3 className="footer-text" style={{marginTop: 15}}> Программный директор форума </h3>
                <h3 className="footer-text" style={{marginTop: -6}}> telegram:
                    <a className="footer-text" href="http://t.me/diagrun" style={{
                        marginLeft: 5,
                        fontSize: "0.9em"
                    }}>
                        @diagrun
                    </a>
                </h3>

                <h2 className="footer-text" style={{marginTop: 30}}> Богданов Алексей Николаевич </h2>
                <h3 className="footer-text" style={{
                    marginTop: 15
                }}>
                    Начальник отдела информационно-аналитической деятельности <br/>
                    и стратегического планирования в управлении развития<br/> информационных технологий
                </h3>
                <h3 className="footer-text" style={{marginTop: -6}}> a.bogdanov@govirk.ru </h3>
            </div>
            <div id="Security_block" className="footer-text" style={{color: "#9B9B9B", }}>
                <span>Копирование и использование материалов, размещенных на данном сайте,
                    без разрешения правообладателя не допускается.<br/>Все права защищены.</span>
            </div>
            <div className="Info_block w-100 footer-text" style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"}}>
                <div>
                    <img src={telegram} className="Icon"></img>
                    <img src={vk} className="Icon" style={{marginLeft: 30}}></img>
                </div>
                <h2>
                    <a href="https://www.istu.edu/" className="footer-text" style={{
                        marginLeft: 165,
                        fontSize: "0.75em"
                    }}>
                        ФГБОУ ВО ИРНИТУ
                    </a>
                </h2>
                <img src={logo}></img>
            </div>
            <div id="Line"></div>
            <div id="History">
                <span style={{marginLeft: 38}}>Прошлые форумы:</span>
                <a href="https://leader-id.ru/events/294793" style={{
                    textDecoration: "none",
                    marginLeft: 100}}>
                    2022 - LEADER ID
                </a>
            </div>
        </div>
    )
}
