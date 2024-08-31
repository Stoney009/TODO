import React, { useState } from "react";
import { chaoticOrbit } from "ldrs";
import { tailChase } from "ldrs";
chaoticOrbit.register();

tailChase.register();

const Task = ({ job: { id, task, isDone }, removeTask, doneTask }) => {
  const [check, setCheck] = useState(false);
  const [del, setDel] = useState(false);
  const handleRemoveTaskBtn = async () => {
    if (confirm("Are you sure to delete?")) {
      setDel(true);
      await removeTask(id);
      setDel(false);
    }
  };

  const handleOnChange = async () => {
    setCheck(true);
    await doneTask(id, isDone);
    setCheck(false);
  };
  return (
    <div className=" flex justify-between items-center border-2 border-slate-300 p-3 rounded-lg mb-3 last:mb-0">
      <div className=" flex items-center gap-3">
        {/* <input type="checkbox" checked={isDone} onChange={handleOnChange} /> */}
        {check ? (
          <l-chaotic-orbit
            size="35"
            speed="1.5"
            color="#1824c3"
          ></l-chaotic-orbit>
        ) : (
          <input type="checkbox" checked={isDone} onChange={handleOnChange} />
        )}

        <p className={isDone ? "line-through" : ""}>{task}</p>
      </div>

      {del ? (
        <l-tail-chase size="40" speed="1.75" color="#EC3C3C"></l-tail-chase>
      ) : (
        <button
          onClick={handleRemoveTaskBtn}
          className="text-sm bg-red-100 border-2 border-red-100  rounded-lg py-2 text-red-700 px-4"
        >
          Delete
        </button>
      )}
      {/* <button
        onClick={handleRemoveTaskBtn}
        className="text-sm bg-red-100 border-2 border-red-100  rounded-lg py-2 text-red-700 px-4"
      >
        Delete
      </button> */}
    </div>
  );
};

export default Task;
