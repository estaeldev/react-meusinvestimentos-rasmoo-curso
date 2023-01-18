import React from 'react'
import ReactDOM from 'react-dom/client'

import { WalletProvider } from 'hooks/useWallet'
import "./styles/global.scss"
import { Routes } from 'routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

    <React.StrictMode>
        <WalletProvider>
            <Routes />
        </WalletProvider>
    </React.StrictMode>
)
