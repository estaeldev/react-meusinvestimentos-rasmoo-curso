import React from 'react'
import ReactDOM from 'react-dom/client'
import {HomePage} from './pages/home'
import {MyInvestmentsPage} from './pages/myinvestiments'
import "./styles/global.scss"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MyInvestmentsPage />
  </React.StrictMode>
)
