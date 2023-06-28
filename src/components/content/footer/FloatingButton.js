import React from "react"

import nerpa_button from '../../../assets/pics/nerpa_floating_button.svg'

export default function FloatingButton() {
    return(
        <div id="Floating-button" className="mt-auto ms-auto" style={{ cursor: "pointer" }}
             onClick={() => window.scrollTo(0, 0)}>
            <img
                src={nerpa_button}
                alt="Image"
                data-tip="Наверх"
                data-place="top"
                style={{height: 200, pointerEvents: "none"}}
            />
            <div id="Block_arrow" className="custom-block" style={{
                marginLeft: 30,
                display: "flex",
                alignItems: "center",
                paddingLeft: 6,
                paddingRight: 6
            }}>
                <i id="Icon_arrow" className="fa-duotone fa-arrow-up" ></i>
                <span>Наверх</span>
                <i id="Icon_arrow" className="fa-duotone fa-arrow-up" ></i>
            </div>
        </div>
    )
}