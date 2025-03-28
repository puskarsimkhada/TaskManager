import React, { useEffect, useState } from 'react';
// import { getTask, deleteTask, updateTask, postTask } from "../API/api";
import * as api from '../API/api'
import axios from 'axios';
// import API from '../API/api'
const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskStatus, setTaskStatus] = useState("Pending");
    const [taskDescription, setTaskDescription] = useState("");

    useEffect(() => {
        const fetchTask = async () => {
            try{
            // const response  = await getTask();
            // debugger
            const response  = await api.getTask();
            console.log("Hello")
            console.log(response);
            if(Array.isArray(response.data)){

                setTasks(response.data);
            }
            else{
                setError("Invalid Data Format");
            }
            } catch(err){
                setError("Error Fetcing the Data");
                console.log("Error");
            }
        }
        fetchTask();
    },[]);

  const handleStatusChange = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

//adding the new task
const handleAddTask = async(e) => {
  e.preventDefault();
    const newTask = {
        title : taskTitle,
        description: taskDescription,
        status:taskStatus,
    };
    try{
      // debugger
      const response  = await api.postTask(newTask);
        console.log("Task added Succesfully");
        // setTasks([...tasks, response.data]);
        console.log("Add task:",response.data);
        if(response.data){

          setTasks(prevTasks => [...prevTasks, response.data]);
        }

        setTaskTitle('');
        setTaskDescription('');
        setTaskStatus('Pending');
        setIsOpen(false);

    } catch(err){
        setError("Error Adding the Task");
        console.log("Error Adding the Task");
    }

  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100"; 
      case "In Progress":
        return "bg-blue-100"; 
      case "Completed":
        return "bg-green-100";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-screen-xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">Task Manager</h2>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            + Add Task
          </button>
        </div>

        <div className="space-y-4">
          {tasks && tasks.length > 0 ? tasks.map((task, index) => (
            <div
              key={index}
              className={`relative p-4 rounded-lg shadow-md hover:shadow-xl transition ${getStatusColor(task.status)}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-semibold text-gray-800 cursor-pointer">{task.title}</h3>
                  <p className="text-gray-600 mt-2">{task.description}</p>
                </div>

                <div className="absolute top-4 right-4 flex items-center space-x-4">
                  {/* Dynamic Status with Button */}
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className="px-3 py-1 text-sm font-semibold rounded-lg border"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>

                  {/* Edit and Delete */}
                  {task.status !== "Completed" && (
                    <button className="text-blue-500 hover:underline">Edit</button>
                  )}
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )) : (<p>No Task Available</p>)}
        </div>
      </div>

      {/* Modal for Adding Task */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl">
              &times;
            </button>

            <h2 className="text-2xl font-bold text-center mb-4">Add New Task</h2>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">Task Title</label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task title"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Task Description</label>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task description"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Task Status</label>
                <select
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
