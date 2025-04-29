import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Account from './pages/Account'
import Deposit from './pages/Deposit'
import Withdraw from './pages/Withdraw'
import InputAPI from './pages/InputAPI'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<InputAPI />} />
        <Route path="/account" element ={<Account />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
      </Routes>
    </Router>
  </StrictMode>,
)