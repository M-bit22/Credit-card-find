import Sidebar from './components/layout/Sidebar'
import ChatWidget from './components/chatbot/ChatWidget'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="flex min-h-screen bg-[#0B0E13]">

      <Sidebar />

      <div className="min-w-0 flex-1">
        <Dashboard />
      </div>

      <ChatWidget />

    </div>
  )
}

export default App