import React from 'react'
import Navbar from './Component/Navbar'
import TaskList from './Component/TaskList'
import AddTask from './Component/Addtask'
import TaskManager from './Component/TaskManager'
const App = () => {
  return (
    <>
      <Navbar></Navbar>
      {/* <AddTask></AddTask>
      <TaskList></TaskList> */}
      <TaskManager></TaskManager>
    </>
  )
}

export default App
