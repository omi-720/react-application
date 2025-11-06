import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { fetchInitialTasks } from "../redux/tasksSlice";
import { logout } from "../redux/authSlice";

export default function Dashboard(){
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector(s => s.tasks);
  const user = useSelector(s => s.auth.user);

  useEffect(()=>{
    if(!loading && tasks.length === 0) dispatch(fetchInitialTasks());
  }, [dispatch, loading, tasks.length]);

  const handleLogout = () => dispatch(logout());

  return (
    <div className="container space-y-4">
      <Navbar onLogout={handleLogout} user={user} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 card">
          <h2 className="text-lg font-semibold mb-2">Add Task</h2>
          <TaskForm />
          <div className="mt-4">
            <h3 className="font-medium mb-2">Filters</h3>
            <div className="flex gap-2">
              <button onClick={() => dispatch({ type: "tasks/setFilter", payload: "ALL" })} className="px-3 py-1 bg-gray-200 rounded">All</button>
              <button onClick={() => dispatch({ type: "tasks/setFilter", payload: "COMPLETED" })} className="px-3 py-1 bg-gray-200 rounded">Completed</button>
              <button onClick={() => dispatch({ type: "tasks/setFilter", payload: "PENDING" })} className="px-3 py-1 bg-gray-200 rounded">Pending</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold">Tasks</h2>
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
}
