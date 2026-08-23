import React, { useEffect } from 'react'
import Home from './pages/Home'
import getCurrentUsers from './features/getCurrentUser'
import { useDispatch } from 'react-redux'
import { setUserdata } from './redux/userSlice'
export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const getUser = async () => {
      const data = await getCurrentUsers()
      dispatch(setUserdata(data))
    }
    getUser()
  }, [])

  return (
    <>
      <Home />
    </>
  )
}
