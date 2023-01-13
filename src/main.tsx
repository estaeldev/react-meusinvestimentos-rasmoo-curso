import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {HomePage} from './pages/home'
import {MyInvestmentsPage} from './pages/myinvestiments'
import { InvestmentsListPage } from './pages/investmenstlist'
import { InvestirPage } from './pages/invest'
import "./styles/global.scss"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/meus-investimentos' element={<MyInvestmentsPage />}/>
        <Route path='/investir' element={<InvestmentsListPage />}/>
        <Route path='/investir/:id' element={<InvestirPage />}/>
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
)
