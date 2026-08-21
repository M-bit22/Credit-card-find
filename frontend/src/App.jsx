import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import ChatWidget from './components/chatbot/ChatWidget'
import Dashboard from './pages/Dashboard'
import Cards from './pages/Cards'
import Offers from './pages/Offers'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <div className="flex min-h-screen bg-[#0B0E13]">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="min-w-0 flex-1">

        {activePage === 'dashboard' && <Dashboard />}

        {activePage === 'cards' && <Cards />}

        {activePage === 'offers' && <Offers />}

      </div>

      <ChatWidget />

    </div>
  )
}

export default App