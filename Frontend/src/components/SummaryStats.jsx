import React, { useEffect, useState } from "react";
import axios from "axios";

function SummaryStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/reports/stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return <div>Loading stats...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-sm text-gray-500">Total Devices</h2>
        <p className="text-2xl font-semibold">{stats.total_devices}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-sm text-gray-500">Critical Devices</h2>
        <p className="text-2xl font-semibold text-red-500">
          {stats.critical_devices}
        </p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-sm text-gray-500">Avg. Downtime (days)</h2>
        <p className="text-2xl font-semibold">{stats.average_downtime_days}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-sm text-gray-500">Last Updated</h2>
        <p className="text-xs">{stats.last_updated}</p>
      </div>
    </div>
  );
}

export default SummaryStats;
