import React from "react"

export default function WarningLabel() {
    return(
        <div id="Warning-label" className="d-flex me-auto ms-auto mb-auto p-5">
            <span className="text-center regular-text ms-5">
                Выберите контент для изменения в правом углу из списка,
            <br />
            чтобы продолжить работу с панелью
            </span>
            <i className="fa-solid fa-circle-exclamation" />
        </div>
    )
}