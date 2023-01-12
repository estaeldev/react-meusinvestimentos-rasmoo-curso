import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {HomePage} from './pages/home'
import {MyInvestmentsPage} from './pages/myinvestiments'
import { InvestmentsListPage } from './pages/investmenstlist'
import "./styles/global.scss"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/meus-investimentos' element={<MyInvestmentsPage />}/>
        <Route path='/investir' element={<InvestmentsListPage />}/>
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
)
