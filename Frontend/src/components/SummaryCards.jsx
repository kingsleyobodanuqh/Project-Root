import React, { useEffect, useState } from "react";
import axios from "axios";

function SummaryCards() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/reports/stats")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error("Failed to load summary stats", error);
      });
  }, []);

  if (!stats) return <p className="text-gray-500">Loading summary...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
      <div className="bg-white rounded shadow p-4 text-center">
        <h3 className="text-sm font-medium text-gray-500">Total Devices</h3>
        <p className="text-xl font-bold text-blue-600">{stats.total_devices}</p>
      </div>
      <div className="bg-white rounded shadow p-4 text-center">
        <h3 className="text-sm font-medium text-gray-500">Critical Devices</h3>
        <p className="text-xl font-bold text-red-500">{stats.critical_devices}</p>
      </div>
      <div className="bg-white rounded shadow p-4 text-center">
        <h3 className="text-sm font-medium text-gray-500">Avg. Downtime (days)</h3>
        <p className="text-xl font-bold text-yellow-600">{stats.average_downtime_days}</p>
      </div>
      <div className="bg-white rounded shadow p-4 text-center">
        <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
        <p className="text-sm font-semibold text-gray-700">{stats.last_updated}</p>
      </div>
    </div>
  );
}

export default SummaryCards;
