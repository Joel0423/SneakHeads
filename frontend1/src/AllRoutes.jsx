import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Mens from './components/Mens'
import Womens from './components/Womens'
import Collections from './components/Collections'
import SignupFormPage from './components/Signup/SignupFormPage'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/mens' element={<Mens/>} />
        <Route path='/womens' element={<Womens/>} />
        <Route path='/collections' element={<Collections/>} />
        <Route path='/signup' element={<SignupFormPage/>}/>
    </Routes>
  )
}

export default AllRoutes