import { BrowserRouter, Routes, Route } from 'react-router-dom'
import QuoteRequestForm from './components/QuoteRequestForm'
import Admin from './components/Admin'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<QuoteRequestForm />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
