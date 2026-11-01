import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import BoardExplorer from './pages/BoardExplorer'

export default function App() {
  return <div className="min-h-screen flex flex-col"><Header /><Routes><Route path="/" element={<Home />} /><Route path="/boards" element={<BoardExplorer />} /><Route path="*" element={<Home />} /></Routes><Footer /></div>
}
