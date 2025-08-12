import React, { useEffect, useState } from "react";

function DashboardHeader() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  const fetchStats = () => {
    setLoading(true);
    setError(null); // Reset error
    fetch("http://localhost:8000/reports/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch stats");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleRunReport = () => {
    fetch("http://localhost:8000/generate-report", {
      method: "POST",
    })
      .then((res) => res.json())
      .then(() => {
        fetchStats(); // Refresh after report
        alert("Report generated successfully!");
      })
      .catch(() => alert("Failed to generate report."));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <p className="text-gray-500">Loading stats...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!stats) return <p className="text-gray-500">No stats available.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-sm font-medium text-gray-500">Total Devices</h3>
        <p className="text-2xl font-bold">{stats.total_devices}</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-sm font-medium text-gray-500">Critical Devices</h3>
        <p className="text-2xl font-bold text-red-500">{stats.critical_devices}</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-sm font-medium text-gray-500">Avg Downtime</h3>
        <p className="text-2xl font-bold">{stats.average_downtime_days} days</p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-sm font-medium text-gray-500">Last Update</h3>
        <p className="text-sm">{stats.last_updated}</p>
      </div>

      <div className="col-span-2 md:col-span-4 text-right">
        <button
          onClick={handleRunReport}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
        >
          Run Report
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;
