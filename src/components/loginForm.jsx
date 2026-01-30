import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShipImage from "../assets/Ship-freight.jpg";

export default function LoginForm() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (adminId === "DemoAdmin1" && password === "Demo@pp1") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/admin");
    } else {
      setError("❌ Invalid admin ID or password.");
    }
  };

  return (
    <div className="h-full flex">
      <img src={ShipImage} alt="" className="object-cover w-2/3 xl:flex hidden" />
      <div className="w-full bg-[var(--Primary)] p-8 rounded-2xl shadow-md flex justify-center flex-col">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className=" text-red-700 p-2 rounded text-sm font-medium text-center">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="adminId" className="block mb-1 text-sm font-medium text-gray-700">
              Admin ID
            </label>
            <input
              type="text"
              id="adminId"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:[var(--Accent)]"
              placeholder="Enter Admin ID"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 hover:opacity-80 hover:scale-[101%] cursor-pointer bg-[var(--Accent)] text-white font-semibold rounded-lg transition duration-200"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
