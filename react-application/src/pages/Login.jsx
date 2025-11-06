import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector(s => s.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(auth.isLoggedIn) navigate("/dashboard");
  },[auth.isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div className="container">
      <div className="card max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full p-2 border rounded" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
          <input className="w-full p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <div className="flex items-center justify-between">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">{auth.loading ? "Logging in..." : "Login"}</button>
            {auth.error && <p className="text-red-500">{auth.error}</p>}
          </div>
        </form>
        {/* <p className="mt-4 text-sm text-gray-600">Try: <strong>alice/1234</strong> or <strong>bob/abcd</strong></p> */}
      </div>
    </div>
  );
}
