import React from "react"

export default function Contacts() {
    return(
        <div id="Contacts">
            <h1 className="footer-header-text mb-5"> Контакты </h1>
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
    )
}