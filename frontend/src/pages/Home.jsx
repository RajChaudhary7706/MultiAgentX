import { signInWithPopup } from '@firebase/auth'
import React from 'react'
import { auth, googleProvider } from '../../utils/firebase'
import api from '../../utils/axios'

function Home() {

  const handlelogin = async (token) => {
    try {
      const { data } = await api.post("/auth/login", { token })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  const googlelogin = async () => {
    const data = await signInWithPopup(auth, googleProvider)
    const token = await data.user.getIdToken()
    console.log(token)
    await handlelogin(token)
    console.log(data)
  }

  return (
    <div className='h-screen flex bg-[#0d0f14] text-white overflow-hidden'>

    </div>
  )
}

export default Home