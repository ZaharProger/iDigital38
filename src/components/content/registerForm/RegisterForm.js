import React, {useCallback, useEffect, useState} from "react"

import ComponentHeader from "../componentHeader/ComponentHeader"
import useApi from "../../../hooks/useApi"
import useValidation from "../../../hooks/useValidation"

export default function RegisterForm() {
    const [isRegistered, setIsRegistered] = useState(false)
    const [error, setError] = useState('')
    const validate = useValidation()
    const performApiCall = useApi()

    const validateFields = useCallback((fields, form) => {
        const validationResult = validate(fields, (inputValue) =>
            !RegExp(/^\s*$/).test(inputValue))

        form.querySelectorAll('input').forEach(input => {
            input.classList.remove('error')

            if (validationResult.includes(input)) {
                input.classList.add('error')
            }
        })

        return validationResult.length == 0
    }, [])

    useEffect(() => {
        const form = document.querySelector('form')

        if (form !== null) {
            form.onsubmit = (e) => {
                e.preventDefault()

                if (validateFields(form.querySelectorAll('input'), form)) {
                    const submitButton = form.querySelector('button')

                    const prevButtonText = submitButton.innerText
                    submitButton.innerText = 'Отправка данных...'
                    submitButton.disabled = true

                    performApiCall('/api/appointments/', 'POST', new FormData(form), null).then(responseData => {
                        submitButton.innerText = prevButtonText
                        submitButton.disabled = false

                        if (responseData.status == 200) {
                            form.querySelectorAll('input').forEach(input => input.value = '')
                            setIsRegistered(true)
                            setError('')
                        }
                        else {
                            const warningMessage = responseData.status != 500? responseData.data.message :
                                'Произошла внутренняя ошибка сервера. Пожалуйста, повторите запрос позже'
                            setIsRegistered(false)
                            setError(warningMessage)
                        }
                    })
                }
                else {
                    setIsRegistered(false)
                    setError('Заполните все поля формы!')
                }
            }
        }
    }, [])

    return (
        <div id="Register-form" className="d-flex flex-column">
            <ComponentHeader header_text={ 'Станьте участником форума!' } />
            <form className="d-flex flex-column m-auto justify-content-center pt-2 pb-3 pe-2 ps-2 neon">
                <label className="regular-text">ФИО</label>
                <input name="name" type="text" />
                <label className="regular-text">Ваши контакты</label>
                <input name="contacts" type="text" />
                <label className="caption-text info-label">
                    Можно указать e-mail, номер телефона или ссылку на Telegram аккаунт
                </label>
                <label className="regular-text">Организация</label>
                <select name="organization">
                    <option>Школа (ученик)</option>
                    <option>Университет (студент)</option>
                    <option>Предприятие (сотрудник компании)</option>
                </select>
                <button type="submit" className="submit-button d-flex regular-text">
                    Отправить
                </button>
                {
                    isRegistered?
                        <span className="regular-text text-center mt-2">
                            Спасибо! Информация успешно получена
                            <br />
                            До встречи на форуме!
                        </span>
                        :
                        error != ''?
                            <span className="regular-text text-center mt-2">
                                { error }
                            </span>
                            :
                            null
                }
            </form>
            <button id="funding-button" type="button" className="text-center regular-text me-auto ms-auto mb-auto mt-3"
                    data-bs-toggle="modal" data-bs-target="#Funding-modal">
                Подробнее о взносах
            </button>
        </div>
    )
}