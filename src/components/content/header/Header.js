import React from "react"
import background from "../../../assets/pics/background.svg"
import logo from "../../../assets/pics/logo.svg"
import "../../../styles/header.css"

export default function Header() {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div  style={{height: 200, backgroundImage: `url(${background})`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover"
        }}>
            <div id="Header" className="w-100">
                <img src={logo} onClick={() => window.scrollTo(0, 0)} style={{cursor: "pointer"}}></img>
                <div style={{fontFamily: "hisqaida_2018bold",
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
        </div>
    )
}