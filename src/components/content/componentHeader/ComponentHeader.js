import React from "react"

import '../../../styles/component-header.css'

export default function ComponentHeader(props) {
    return (
        <div className="Component-header d-flex me-auto ms-auto mb-2">
            <h3 className="text-center">{ props.header_text }</h3>
        </div>
    )
}