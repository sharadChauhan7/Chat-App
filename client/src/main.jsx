import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {AuthState} from './hooks/authstate.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <AuthState>
    <Toaster/>
    <App />
  </AuthState>
)
