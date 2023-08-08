import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App.js'
import './styles/index.css'
import './styles/classes.css'

const root = createRoot(document.getElementById('root'))
root.render(
    <Router>
        <App />
    </Router>
)