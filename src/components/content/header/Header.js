import React, {useCallback, useContext, useState} from "react"

import logo from "../../../assets/pics/logo.svg"
import "../../../styles/header.css"
import {contentContext} from "../../../context"


export default function Header() {
    const [isExpanded, setIsExpanded] = useState(false)
    const isMobile = useContext(contentContext)

    const scrollToSection = useCallback((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView( {
                behavior: "smooth",
                block: "center",
                inline: "nearest"
            });
            if (isMobile) {
                setIsExpanded(false)
            }
        }
    }, [isMobile])

    const navbarTogglerClasslist =
        `fa-solid fa-${ isExpanded? 'xmark' : 'bars' } navbar-toggler d-flex justify-content-center${isExpanded? ' mb-4' : ''}`

    return (
        <nav id="Header" className="navbar w-100 pb-3 pt-3">
            <div className="container-fluid">
                <img src={logo} onClick={ () => scrollToSection('Salutation') } data-bs-target="#drawer"
                     data-bs-toggle={ `${isMobile && isExpanded? 'collapse' : ''}` }></img>
                <div style={{
                    fontFamily: "hisqaida_2018bold",
                    fontWeight: "bold",
                    fontSize: 18
                }}>
                    {
                        isMobile?
                            <i data-bs-toggle="collapse" data-bs-target="#drawer"
                               onClick={ () => setIsExpanded(!isExpanded) } className={ navbarTogglerClasslist }></i>
                            :
                            null
                    }
                    <div id="drawer" className={ `${isMobile? 'collapse' : ''}` }>
                        <div style={{
                            fontFamily: "hisqaida_2018bold",
                            fontWeight: "bold",
                            fontSize: 18
                        }} className="d-flex justify-content-start align-items-center">
                            <ul className={`navbar-nav flex-${isMobile? 'column' : 'row'}`}>
                                <li className={ `nav-item ${isMobile? 'mb-3' : 'me-4'}` }
                                    data-bs-toggle={ `${isMobile? 'collapse' : ''}` } data-bs-target="#drawer">
                                    <a onClick={() => scrollToSection('News')}
                                       className="nav-link">Новости</a>
                                </li>
                                <li className={ `nav-item ${isMobile? 'mb-3' : 'me-4 ms-4'}` }
                                    data-bs-toggle={ `${isMobile? 'collapse' : ''}` } data-bs-target="#drawer">
                                    <a onClick={() => scrollToSection('Organizers')}
                                       className="nav-link">Организационный<br/>комитет</a>
                                </li>
                                <li className={ `nav-item ${isMobile? 'mb-3' : 'me-4 ms-4'}` }
                                    data-bs-toggle={ `${isMobile? 'collapse' : ''}` } data-bs-target="#drawer">
                                    <a onClick={() => scrollToSection('Forum-programme')}
                                       className="nav-link">Программа<br/>форума</a>
                                </li>
                                <li className={ `nav-item${isMobile? '' : ' ms-4'}` }
                                    data-bs-toggle={ `${isMobile? 'collapse' : ''}` } data-bs-target="#drawer">
                                    <a onClick={() => scrollToSection('event-carousel')}
                                       className="nav-link" >Мероприятия</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}