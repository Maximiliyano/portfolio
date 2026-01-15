import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Main } from './core/Main'
import { Home } from './pages/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
