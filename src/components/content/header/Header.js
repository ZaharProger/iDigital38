import React from "react"
import background from "../../../assets/pics/background.svg"
import logo from "../../../assets/pics/logo.svg"
import "../../../styles/header.css"
import nerpa_intro from "../../../assets/pics/nerpa_intro.svg";


export default function Header() {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        <div style={{
            height: 800, backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}>
            <div id="Header" className="w-100">
                <img src={logo}></img>
                <div style={{
                    fontFamily: "hisqaida_2018bold",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 20,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 50,
                    marginRight: 50
                }}>
                    <a onClick={() => scrollToSection('News')}>Новости</a>
                    <a onClick={() => scrollToSection('News')}>Организационный<br/>комитет</a>
                    <a onClick={() => scrollToSection('Forum-programme')}>Программа<br/>форума</a>
                    <a onClick={() => scrollToSection('event-carousel')}>Мероприятия</a>
                </div>
            </div>


            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                }}
            >
                <img src={nerpa_intro} id="NerpaIntro" style={{marginLeft: "-90px", marginTop: '100px'}}></img>

                <div
                    style={{
                        fontFamily: "hisqaida_2018bold",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 30,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        textAlign: "center",
                        gap: 10,
                        marginRight: 50,
                        marginTop: '350px'
                    }}
                >
                    <span>
            ИРНИТУ приглашает молодежь<br/>
            Сибири и Дальнего востока к<br/>
            участию в конкурсе IT-проектов
                   </span>
                </div>

            </div>

        </div>
    )
}