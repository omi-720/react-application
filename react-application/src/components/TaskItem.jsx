import React from "react";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask } from "../redux/tasksSlice";
import toast from "react-hot-toast";

export default function TaskItem({ task }){
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
    toast(task.completed ? "Marked pending" : "Marked complete");
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast.success("Task deleted");
  };

  return (
    <li className="flex items-start justify-between bg-gray-50 border p-3 rounded">
      <div>
        <div className="flex items-center gap-3">
          <input type="checkbox" checked={task.completed} onChange={() => { dispatch(toggleTask(task.id)); }} />
          <h3 className={`${task.completed ? "line-through text-gray-500" : "font-semibold"}`}>{task.title}</h3>
          <span className="ml-2 text-xs px-2 py-0.5 bg-gray-200 rounded">{task.priority}</span>
        </div>
        {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
        <div className="text-xs text-gray-500 mt-1">Source: {task.source || "local"}</div>
      </div>

      <div className="flex flex-col gap-2">
        <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
      </div>
    </li>
  );
}
