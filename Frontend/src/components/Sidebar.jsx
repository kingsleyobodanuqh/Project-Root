import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">Network Monitor</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-yellow-300">Dashboard</Link>
        <Link to="/reports" className="hover:text-yellow-300">Reports</Link>
        <Link to="/analytics" className="hover:text-yellow-300">Analytics</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
