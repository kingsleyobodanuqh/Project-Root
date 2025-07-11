import React from 'react';

function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold text-blue-600">Network Monitor</h2>
        <nav className="mt-6">
          <ul className="space-y-4 text-gray-700">
            <li className="hover:text-blue-500 cursor-pointer">Dashboard</li>
            <li className="hover:text-blue-500 cursor-pointer">Reports</li>
            <li className="hover:text-blue-500 cursor-pointer">Analytics</li>
          </ul>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Overview of PRTG Monitored Servers</p>
        </header>

        {/* Placeholder for report content */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Live Server Reports</h2>
          <div className="text-gray-600">
            {/* We'll replace this with real server data soon */}
            <p>Loading report data...</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
