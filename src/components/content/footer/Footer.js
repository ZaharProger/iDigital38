import React from "react"

import footer from "../../../assets/pics/footer.svg"
import vk from "../../../assets/pics/icon/vk.svg"
import telegram from "../../../assets/pics/icon/telegram.svg"
import logo from "../../../assets/pics/logo.svg"

import '../../../styles/footer.css'


export default function Footer(){

    const copy = async () => {
        await navigator.clipboard.writeText(text);
        alert('Text copied');
    }

    return(
        <div id="Footer" style={{backgroundImage: `url(${footer})`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover"
        }}>
            <div id="Contacts"> 
                <h1> Контакты </h1>
            </div>
            <div id="Contact_block">
                <h2 style={{fontSize: 22, fontWeight: "bold"}}> Дмитрий Салко </h2>
                <h3 style={{marginTop: 15, fontSize: 18, fontWeight: "bold"}}> Программный директор форума </h3>
                <h3 style={{marginTop: -6, fontSize: 18, fontWeight: "bold"}}> telegram: <a href="http://t.me/diagrun" style={{color: "white"}}>@diagrun</a> </h3>

                <h2 style={{marginTop: 30, fontSize: 22, fontWeight: "bold"}}> Богданов Алексей Николаевич </h2>
                <h3 style={{marginTop: 15, fontSize: 18, fontWeight: "bold"}}> Начальник отдела информационно-аналитической деятельности <br/> и стратегического планирования в управлении развития<br/> информационных технологий </h3>
                <h3 style={{marginTop: -6, fontSize: 18, fontWeight: "bold"}}> a.bogdanov@govirk.ru </h3>
            </div>
            <div id="Security_block" style={{color: "#9B9B9B", }}>
                <span>Копирование и использование материалов, размещенных на данном сайте, без разрешения правообладателя не допускается.<br/>Все права защищены.</span>
            </div>
            <div className="Info_block w-100" style={{flexDirection: "row", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div>
                    <img src={telegram} id="Icon"></img>
                    <img src={vk} id="Icon" style={{marginLeft: 30}}></img>
                </div>
                <h2> <a href="https://www.istu.edu/" style={{fontSize: 18, fontWeight: "bold", color: "white", marginLeft: 160}}>ФГБОУ ВО ИРНИТУ</a></h2>
                <img src={logo}></img>
            </div>
            <div id="Line"></div>
            <div id="History">
                <span style={{marginLeft: 38, fontSize: 16}}>Прошлые форумы:</span>
                <a href="https://leader-id.ru/events/294793" style={{color: "white", fontSize: 16, textDecoration: "none", marginLeft: 100}}>2022 - LEADER ID</a>
            </div>
        </div>
    )
}
