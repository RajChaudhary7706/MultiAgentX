import React, { useEffect } from 'react'
import Home from './pages/Home'
import getCurrentUsers from './features/getCurrentUser'

export default function App() {
  useEffect(() => {
    const getUser = async () => {
      await getCurrentUsers()
    }
    getUser()
  }, [])

  return (
    <>
      <Home />
    </>
  )
}
