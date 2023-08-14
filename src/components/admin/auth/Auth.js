import React, {useCallback} from 'react';
import '../../../styles/auth.css'
import { useNavigate } from "react-router-dom"
import logo from "../../../assets/pics/logo.svg"
import useApi from "../../../hooks/useApi"
import useValidation from "../../../hooks/useValidation"
import { ROUTES } from '../../../globalConstants';
import {HOST} from "../../../globalConstants"


export default function Auth() {

  const navigate = useNavigate()
  const performApiCall = useApi()
  const validate = useValidation()

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

  const onSubmitting = (e) => {

    e.preventDefault()
    const form = document.querySelector('form')
    if (form !== null) {

      const inputsToValidate = Array.from(document.getElementsByTagName('input'))
      if (validateFields(inputsToValidate, form)) {
        document.getElementById('error-client').style.display = "none";
        const requestMethod = 'POST'
        const requestBody = new FormData(form)

        const submitButton = form.querySelector('.submit-button')
        const prevButtonText = submitButton.innerText
        submitButton.innerText = 'Отправка данных...'
        submitButton.disabled = true

        performApiCall(`${HOST}/api/login/`, requestMethod, requestBody, null)
          .then(responseData => {
            submitButton.innerText = prevButtonText
            submitButton.disabled = false

            if (responseData.status == 200) {
              navigate(ROUTES.admin)
            }
            else {
              document.getElementById('error-server').style.display = "flex";
            }
          })
      } else {
        document.getElementById('error-client').style.display = "flex";
      }
    }

  }

  return (
    <div id='Auth'>
      <form id='form' method='post' onSubmit={(e) => onSubmitting(e)}>

        <img src={logo} />

        <div>
          <span>Логин</span>
          <input type="text" />
        </div>

        <div>
          <span>Пароль</span>
          <input type="password" />
        </div>

        <button className='submit-button' type="submit">Войти</button>

        <div id='error-server' className='error-msg'>
          <span>Произошла внутренняя ошибка сервера.</span>
          <span>Пожалуйста, повторите запрос позже</span>
        </div>

        <div id='error-client' className='error-msg'>
          <span>Пожалуйста, заполните все поля</span>
        </div>

      </form>
    </div>
  )
}