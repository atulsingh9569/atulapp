import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Layout from './ATUL/Layout'
import ShoppingList from './ATUL/pages/ShoppingList'

function App() {
  return (
    <BrowserRouter>
      <Layout currentPageName="Shopping List">
        <Routes>
          <Route path="/" element={<ShoppingList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
