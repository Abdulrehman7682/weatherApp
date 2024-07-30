import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Frontend/Home'

export default function Index() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}
