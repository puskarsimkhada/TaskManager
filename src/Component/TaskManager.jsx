import React, { useEffect, useState } from 'react';
import * as api from '../API/api'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskStatus, setTaskStatus] = useState("Pending");
    const [taskDescription, setTaskDescription] = useState("");
    const [editTaskId, setEditTaskId] = useState(null);
    useEffect(() => {
        const fetchTask = async () => {
            try{
            const response  = await api.getTask();
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

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await api.updateTask(id, {status: newStatus});
      // setTaskStatus(newStatus);
      if(response.data){
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, status: newStatus } : task
        )
      );
      }
    console.log("Status Checking Id: ", id);
    console.log("Status Checking: ", newStatus);
      
    } catch (error) {
        setError("Failed to change the status")
    }
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
      if(editTaskId){
        const response  = await api.updateTask(editTaskId,newTask);
        setTasks((prevTask) => prevTask.map((task) => task.id === editTaskId ? {...task, ...newTask} : task))
        console.log("Task Edit Successfully");
      }
      else{
        const response  = await api.postTask(newTask);
          if(response.data){
            setTasks(prevTasks => [...prevTasks, response.data]);
          }
      }
        setTaskTitle('');
        setTaskDescription('');
        setTaskStatus('Pending');
        setEditTaskId(null);
        setIsOpen(false);
    } catch(err){
        setError("Error Adding the Task");
        console.log("Error Adding the Task");
    }
  };

  //Updating the task
  const handleUpdateTask = async(taskId, updateTitle, updateDescription, updateStatus) => {
    setEditTaskId(taskId);
    setTaskTitle(updateTitle);
    setTaskDescription(updateDescription);
    setTaskStatus(updateStatus);
    setIsOpen(true);
  }

  //Deleting the task
  const handleDeleteTask = async (id) => {
    try{
      await api.deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
      console.log("Task deleted successfully")
    }catch(err){
      console.log("Failed to delete the task");
      setError("Error deleteing the task");
    }
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
        <h2 className="text-2xl sm:text-4xl font-semibold text-center text-gray-800 mb-6">Plan Your Day Tasks</h2>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              setTaskTitle('');
              setTaskDescription('');
              setTaskStatus('Pending');
              setEditTaskId(null);
              setIsOpen(true)}}
            className="bg-green-600 text-white px-3  sm:px-6 py-2 rounded-md hover:bg-green-700 transition"
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
              <div className="flex justify-between items-start mt-5">
                <div className="flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 cursor-pointer">{task.title}</h3>
                  <p className="text-gray-600 mt-2">{task.description}</p>
                </div>

                <div className="absolute top-3 right-3 flex items-center space-x-4">
                  {/* Dynamic Status with Button */}
                  {/* <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className="px-3 py-1 text-sm font-semibold rounded-lg border"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select> */}
                  <p>{task.status}</p>
                  {/* Edit and Delete */}
                  {task.status !== "Completed" &&(
                    <button onClick={() => handleUpdateTask(task.id, task.title, task.description, task.status)} className="text-blue-500 hover:underline"> <FontAwesomeIcon icon={faEdit} /></button>
                  )}
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500 hover:underline"
                  >
                    <FontAwesomeIcon icon={faTrash} />
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

            <h2 className="text-2xl font-bold text-center mb-4">{editTaskId ? <h2>Update Task</h2> : <h2>Add New Task</h2>}</h2>
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
                {editTaskId ?  <p>Update Task </p> : <p> Add Task</p>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
