import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from './pages/Home'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'
import Generate from './pages/Generate'
import Editor from './pages/Editor'

export const serverUrl = "http://localhost:8000"

function App() {
  useGetCurrentUser()

  const {userData, authLoading} = useSelector(state=>state.user)

  if(authLoading) {
    return (
      <div className='min-h-screen bg-[#050505] text-white flex items-center justify-center'>
        <div className='text-sm text-zinc-400'>Loading...</div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={userData ? <Dashboard/> : <Home />} />
        <Route path='/generate'  element={userData?<Generate /> : <Home />} />
        <Route path='/editor/:id' element={userData ? <Editor /> : <Home /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
