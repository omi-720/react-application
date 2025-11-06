import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";
import toast from "react-hot-toast";

export default function TaskForm(){
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title.trim()) return;
    const task = { id: Date.now(), title: title.trim(), description: description.trim(), priority, completed: false, source: "local" };
    dispatch(addTask(task));
    setTitle(""); setDescription(""); setPriority("medium");
    toast.success("Task added");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full p-2 border rounded" />
      <select value={priority} onChange={e=>setPriority(e.target.value)} className="w-full p-2 border rounded">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Add Task</button>
    </form>
  );
}
