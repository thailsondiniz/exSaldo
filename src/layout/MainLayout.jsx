import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Navbar from '../components/Navbar.jsx'
import { ThemeContext } from '../contexts/ThemeContext.jsx'

const MainLayout = ({ children }) => {
  const { isDarkMode } = useContext(ThemeContext)
  
  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-950' : 'bg-gray-100'}`}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout
