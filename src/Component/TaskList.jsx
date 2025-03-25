import React from 'react';

const TaskList = () => {
  const tasks = [
    { id: 1, title: "Complete React Project", status: "Pending" },
    { id: 2, title: "Read Tailwind Documentation", status: "In Progress" },
    { id: 3, title: "Fix Bugs in App", status: "Completed" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Task List</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Task</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b">
                <td className="px-4 py-2">{task.title}</td>
                <td className="px-4 py-2">{task.status}</td>
                <td className="px-4 py-2 text-center">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button className="ml-2 text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
