import React, { useEffect, useState } from "react";
import Heading from "./components/Heading";
import CreateTask from "./components/CreateTask";
import TaskList from "./components/TaskList";

// Default values shown

const App = () => {
  // app state
  const [tasks, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskLoading, setTaskLoading] = useState(false);
  const addTask = async (newTask) => {
    setTaskLoading(true);
    const res = await fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    const data = await res.json();
    console.log(data);
    setTask([...tasks, data]);
    setTaskLoading(false);
  };

  const removeTask = async (id) => {
    const res = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setTask(tasks.filter((task) => task.id !== id));
  };

  const doneTask = async (id, currentStatus) => {
    const res = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        isDone: !currentStatus,
      }),
    });
    const data = await res.json();
    setTask(tasks.map((task) => (task.id === id ? data : task)));
  };
  const fetchTask = async () => {
    const res = await fetch("http://localhost:8000/tasks");
    const data = await res.json();
    setTask(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className=" p-10">
      <Heading />
      <CreateTask addTask={addTask} taskLoading={taskLoading} />
      <TaskList  doneTask={doneTask} removeTask={removeTask} tasks={tasks} />

      {loading && (
        <div className="bg-gray-100 animate-pulse  h-screen">
          <div className="  border grid grid-cols-8 gap-8 mb-5  border-black p-5 ">
            <div className="col-span-6">
              <div className="flex justify-between items-center gap-10">
                <button className="w-6 h-6 bg-gray-500"></button>
                <button className=" w-full h-6 bg-gray-500"></button>
              </div>
            </div>
            <button className="col-span-2  w-[200px] h-6 bg-red-300"></button>
          </div>
          <div className="  border grid grid-cols-8 gap-8 mb-5  border-black p-5 ">
            <div className="col-span-6">
              <div className="flex justify-between items-center gap-10">
                <button className="w-6 h-6 bg-gray-500"></button>
                <button className=" w-full h-6 bg-gray-500"></button>
              </div>
            </div>
            <button className="col-span-2  w-[200px] h-6 bg-red-300"></button>
          </div>
          <div className="  border grid grid-cols-8 gap-8 mb-5  border-black p-5 ">
            <div className="col-span-6">
              <div className="flex justify-between items-center gap-10">
                <button className="w-6 h-6 bg-gray-500"></button>
                <button className=" w-full h-6 bg-gray-500"></button>
              </div>
            </div>
            <button className="col-span-2  w-[200px] h-6 bg-red-300"></button>
          </div>
          <div className="  border grid grid-cols-8 gap-8 mb-5  border-black p-5 ">
            <div className="col-span-6">
              <div className="flex justify-between items-center gap-10">
                <button className="w-6 h-6 bg-gray-500"></button>
                <button className=" w-full h-6 bg-gray-500"></button>
              </div>
            </div>
            <button className="col-span-2  w-[200px] h-6 bg-red-300"></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
