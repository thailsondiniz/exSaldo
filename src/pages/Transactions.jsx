import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Transactions = () => {
  const location = useLocation()

  useEffect(() => {
    console.log('Transactions página carregada:', location.pathname)
  }, [location.pathname])

  return (
    <div className='p-8 w-full bg-[#F1F5F9] min-h-screen'>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Transações</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Página de Transações</p>
      </div>
    </div>
  )
}

export default Transactions