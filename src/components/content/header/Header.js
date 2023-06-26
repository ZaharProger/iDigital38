import React from "react"

import logo from "../../../assets/pics/logo.svg"
import "../../../styles/header.css"

export default function Header() {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView( { behavior: 'smooth', block: "center", inline: "nearest" });
        }
    };

    return (
        <div id="Header" className="w-100">
            <img src={logo}></img>
            <div style={{fontFamily: "hisqaida_2018bold",
                fontWeight: "bold",
                fontSize: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 50,
                marginRight: 50
            }}>
                <a onClick={() => scrollToSection('News')}>Новости</a>
                <a onClick={() => scrollToSection('Gallery')}>Фотогалерея</a>
                <a onClick={() => scrollToSection('News')}>Организационный<br/>комитет</a>
                <a onClick={() => scrollToSection('Forum-programme')}>Программа<br/>форума</a>
                <a onClick={() => scrollToSection('event-carousel')}>Мероприятия</a>
            </div>
        </div>
    )
}