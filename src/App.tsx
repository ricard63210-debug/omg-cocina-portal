import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'
import ReviewsPage from './pages/ReviewsPage'
import EventosPage from './pages/EventosPage'
import FeedbackPage from './pages/FeedbackPage'
import SocialPage from './pages/SocialPage'

// Global components
import Chatbot from './components/Chatbot'

function App() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home onOpenChat={() => setChatOpen(true)} />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/social" element={<SocialPage />} />
        {/* Catch-all → home */}
        <Route path="*" element={<Home onOpenChat={() => setChatOpen(true)} />} />
      </Routes>

      {/* Chatbot is globally available (floats over all pages) */}
      <Chatbot externalOpen={chatOpen} onExternalClose={() => setChatOpen(false)} />
    </BrowserRouter>
  )
}

export default App
