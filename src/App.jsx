import React from 'react'
import Navbar from './Component/Navbar'
import TaskManager from './Component/TaskManager'
import Footer from './Component/Footer'
import Payment from './Component/Payment'
const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <TaskManager></TaskManager>
      <Payment></Payment>
      <Footer></Footer>
    </>
  )
}

export default App
