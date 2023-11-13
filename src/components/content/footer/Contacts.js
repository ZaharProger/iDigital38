import React from "react"

export default function Contacts() {
    return(
        <div id="Contacts">
            <h1 className="footer-header-text mb-5"> Контакты </h1>
            <h2 className="footer-text"> Дарья Лобанова </h2>
            <h3 className="footer-text" style={{marginTop: 15}}> Организационный директор форума </h3>
            <h3 className="footer-text" style={{marginTop: -6}}>
                тел. 8(3952)40-57-22, 8(3952)40-50-27
            </h3>
            <h3 className="footer-text" style={{marginTop: -6}}> telegram:
                <a className="footer-text" href="http://t.me/danilysly" target="_blank" rel="noreferrer noopener"
                   style={{
                    marginLeft: 5,
                    fontSize: "0.9em"
                }}>
                    @danilysly
                </a>
            </h3>
        </div>
    )
}