import { BrowserRouter, Routes as RoutesDom, Route } from 'react-router-dom'

import {HomePage} from 'pages/home'
import { InvestirPage } from 'pages/invest'
import { AddBalancePage } from 'pages/adicionarsaldo'
import {MyInvestmentsPage} from 'pages/myinvestiments'
import { InvestmentsListPage } from 'pages/investmenstlist'

export function Routes() {
    return (
        <BrowserRouter>
            <RoutesDom>
                <Route path='/' element={<HomePage />}/>
                <Route path='/meus-investimentos' element={<MyInvestmentsPage />}/>
                <Route path='/investir' element={<InvestmentsListPage />}/>
                <Route path='/investir/:id' element={<InvestirPage />}/>
                <Route path='/adicionar-saldo' element={<AddBalancePage />}/>
            </RoutesDom>
        </BrowserRouter>
    )
}