import React from 'react';
import '../../../styles/auth.css'
import logo from "../../../assets/pics/logo.svg"

export default function Auth() {
  return (
    <div id='Auth'>
      <form id='form' action='/' method='post'>

        <img src={logo}/>

        <div>
          <span>Логин</span>
          <input type="text" />
        </div>

        <div>
          <span>Пароль</span>
          <input type="password" />
        </div>

        <input id='button' type="submit" value="Войти" />
      
      </form>
    </div>
  )
}