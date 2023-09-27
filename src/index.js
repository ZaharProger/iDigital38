import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App.js'
import './styles/index.css'
import './styles/classes.css'
import './styles/forms.css'
import {Provider} from "react-redux"
import {authStore} from "./redux/store"

const root = createRoot(document.getElementById('root'))
root.render(
    <Router>
        <Provider store={ authStore }>
            <App />
        </Provider>
    </Router>
)