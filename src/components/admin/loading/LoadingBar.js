import React from "react"

import icon from '../../../assets/pics/nerpa_floating_button.svg'
import '../../../styles/loading.css'

export default function LoadingBar() {
    return(
        <div id="Loading-bar" className="d-flex me-auto ms-auto mb-auto mt-5 flex-column justify-content-center">
            <img src={ icon } />
            <span className="regular-text mt-2 text-center p-2">Получение данных</span>
        </div>
    )
}