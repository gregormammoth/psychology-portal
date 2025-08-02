import { useState } from 'react'
import { BarChart3, Mail } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Contacts from './pages/Contacts'

type Page = 'dashboard' | 'contacts'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  const navigation = [
    { key: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { key: 'contacts', name: 'Contacts', icon: Mail },
  ]

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'contacts':
        return <Contacts />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Psychology Portal Admin
              </h1>
            </div>
            <nav className="flex items-center space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.key
                return (
                  <button
                    key={item.key}
                    onClick={() => setCurrentPage(item.key as Page)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  )
}

export default App 