import React, {useCallback, useState} from "react"

import '../../../styles/wrap-button.css'

export default function WrapButton(props) {
    const [isClicked, setIsClicked] = useState(true)
    const [isHovered, setIsHovered] = useState(false)

    const { set_is_wrapped: setIsWrapped, header_text } = props.wrap_button_props

    const buttonCaptionClassList = `header-text text-center d-flex me-2${isHovered? ' hovered' : ''}`
    const buttonIconClassList = `fa-regular fa-${isClicked? 'plus' : 'minus'} m-auto${isHovered? ' hovered' : ''}`

    const changeWrappedDataState = useCallback(() => {
        const newValue = !isClicked

        setIsClicked(newValue)
        setIsWrapped(newValue)
    }, [setIsWrapped])

    return (
        <div className="Wrap-button d-flex flex-row mb-3 me-auto" onClick={ () => changeWrappedDataState() }
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