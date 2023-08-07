import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App.js'
import './styles/index.css'
import './styles/classes.css'
import store from './redux/store.js'

const root = createRoot(document.getElementById('root'))
root.render(
    <Router>
        <Provider store={ store }>
            <App />
        </Provider>
    </Router>
)