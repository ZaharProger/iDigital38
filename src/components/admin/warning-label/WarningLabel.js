import React from "react"

import '../../../styles/warning-label.css'

export default function WarningLabel(props) {
    return(
        <div id="Warning-label" className="d-flex me-auto ms-auto mb-auto p-5"
        style={{
            backgroundColor: 'var(--primary-color)',
            borderRadius: 10,
            marginTop: props.text === null? 250 : 100
        }}>
            {
                props.text === null?
                    <span className="text-center regular-text ms-5">
                        Выберите контент для изменения в правом углу из списка,
                        <br />
                        чтобы продолжить работу с панелью
                    </span>
                    :
                    <span className="text-center regular-text ms-5">
                        {
                            props.text
                        }
                    </span>
            }
            <i className="fa-solid fa-circle-exclamation" />
        </div>
    )
}