import React from "react"

export default function Hint(props) {
    return(
        <div id="Hint" className="d-flex flex-column mt-2 mb-auto me-auto ms-auto p-2">
            <span className="d-flex text-center semi-header-text me-auto ms-auto mb-2">Подсказка</span>
            <span className="d-flex me-auto ms-auto regular-text">
                {
                    props.hint_text
                }
            </span>
        </div>
    )
}