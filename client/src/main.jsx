import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {AuthState} from './hooks/states'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthState>
    <App />
  </AuthState>
)
