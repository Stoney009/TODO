import React, { useState } from "react";
import { chaoticOrbit } from "ldrs";

chaoticOrbit.register();

// Default values shown

const CreateTask = ({ addTask, taskLoading }) => {
  const [job, setJob] = useState("");

  const handleOnChange = (event) => {
    setJob(event.target.value);
  };

  const handleAddTaskBtn = () => {
    if (job.length > 5) {
      const newTask = {
        task: job,
        isDone: false,
      };
      addTask(newTask);
      setJob("");
    }else{
      alert("Task must be at least 5 characters long")
    }
  };

  return (
    <div className=" flex mb-5">
      <input
        type="text"
        className=" flex-grow disabled:bg-gray-400  border-2 border-slate-300  rounded-l-lg p-2"
        value={job}
        disabled={taskLoading}
        onChange={handleOnChange}
        placeholder="Write your new task"
      />
      <button
        onClick={handleAddTaskBtn}
        className=" bg-slate-300 border-2 border-slate-300  rounded-r-lg py-2 px-4"
      >
        {taskLoading ? (
          <l-chaotic-orbit
            size="35"
            speed="1.5"
            color="#1824c3"
          ></l-chaotic-orbit>
        ) : (
          "Add Task"
        )}
      </button>
    </div>
  );
};

export default CreateTask;
