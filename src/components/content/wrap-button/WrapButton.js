import React, {useCallback, useState} from "react"

import '../../../styles/wrap-button.css'

export default function WrapButton(props) {
    const [isClicked, setIsClicked] = useState(true)
    const [isHovered, setIsHovered] = useState(false)

    const { set_is_wrapped: setIsWrapped, header_text } = props.wrap_button_props

    const buttonCaptionClassList = `header-text p-0 d-flex me-2${isHovered? ' hovered' : ''}`
    const buttonIconClassList = `fa-regular fa-${isClicked? 'chevron-down' : 'chevron-up'} m-auto${isHovered? ' hovered' : ''}`

    const changeWrappedDataState = useCallback(() => {
        const newValue = !isClicked

        setIsClicked(newValue)
        setIsWrapped(newValue)
    }, [setIsWrapped])

    return (
        <div className="Wrap-button d-flex flex-row mb-1 me-auto" onClick={ () => changeWrappedDataState() }
             onMouseOver={ () => setIsHovered(true) } onMouseLeave={ () => setIsHovered(false) } >
            <button type="button" className={ buttonCaptionClassList }>
                {
                    header_text
                }
            </button>
            <i className={ buttonIconClassList }></i>
        </div>
    )
}