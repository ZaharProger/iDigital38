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

                    const formData = new FormData(form)
                    const checkBoxes = form.querySelectorAll('input[type=checkbox]')
                    const sections = []
                    for (let i = 0; i < checkBoxes.length; ++i) {
                        if (checkBoxes[i].checked) {
                            sections.push(checkBoxes[i].parentElement.querySelector('label').innerText)
                        }
                        formData.delete(`${i}`)
                    }
                    formData.set('sections', sections.join(', '))

                    performApiCall('/api/appointments/', 'POST', formData, null).then(responseData => {
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
            <form className="d-flex flex-column m-auto justify-content-center p-4 neon">
                <label className="regular-text">ФИО</label>
                <input name="name" type="text" />
                <label className="regular-text">Должность</label>
                <input name="status" type="text" />
                <label className="regular-text">Организация</label>
                <select name="organization">
                    <option>Школа (ученик)</option>
                    <option>Университет (студент)</option>
                    <option>Предприятие (сотрудник компании)</option>
                </select>
                <label className="regular-text">E-mail</label>
                <input name="email" type="text" />
                <label className="regular-text">Номер телефона</label>
                <input name="phone" type="text" />
                <label className="regular-text">Формат участия</label>
                <select name="participation_type">
                    <option>Участник</option>
                    <option>Партнер</option>
                </select>
                <label className="regular-text">Выбор секций</label>
                <div className="d-flex flex-row justify-content-space-around">
                    <label className="regular-text">Будущее в IT для студента и школьника</label>
                    <input type="checkbox" name="0"></input>
                </div>
                <div className="d-flex flex-row justify-content-space-around">
                    <label className="regular-text">Возможность стажировки в IT</label>
                    <input type="checkbox" name="1"></input>
                </div>
                <div className="d-flex flex-row justify-content-space-around">
                    <label className="regular-text">Цифровизация госсектора</label>
                    <input type="checkbox" name="2"></input>
                </div>
                <div className="d-flex flex-row justify-content-space-around">
                    <label className="regular-text">Опыт цифровой трансформации Региона с учетом современных ИТ-трендов</label>
                    <input type="checkbox" name="3"></input>
                </div>
                <div className="d-flex flex-row justify-content-space-around">
                    <label className="regular-text">День 1С:Карьеры</label>
                    <input type="checkbox" name="4"></input>
                </div>
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
            <button id="funding-button" type="button"
                    className="text-center regular-text me-auto ms-auto mb-auto mt-4 pt-2 pb-2 pe-3 ps-3"
                    data-bs-toggle="modal" data-bs-target="#Funding-modal">
                Подробнее о взносах
            </button>
        </div>
    )
}