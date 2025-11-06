import React from "react";

export default function Navbar({ onLogout, user }){
  return (
    <div className="flex items-center justify-between card">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">Personal Task Manager</h1>
        <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
      </div>
      <div>
        <button onClick={onLogout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
      </div>
    </div>
  );
}
