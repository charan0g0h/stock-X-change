import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import LoginPage from './LoginPage/Loginpage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <App></App>
  </BrowserRouter>
)
