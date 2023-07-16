import React from 'react';
import '../../styles/auth.css'

export default function Auth() {
  return (
    <div id='Auth'>
      <form>
        <h3>Авторизация</h3>
        <div>
          <span>Логин</span>
          <input type="text" />
        </div>
        <div>
          <span>Пароль</span>
          <input type="password" />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  )
}