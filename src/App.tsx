import Hero from './components/Hero'
import HoursBar from './components/HoursBar'
import Menu from './components/Menu'
import Promotions from './components/Promotions'
import Reviews from './components/Reviews'
import Feedback from './components/Feedback'
import Chatbot from './components/Chatbot'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      <Hero />
      <HoursBar />
      <Menu />
      <Promotions />
      <Reviews />
      <Feedback />
      <Footer />
      <Chatbot />
    </div>
  )
}

export default App
