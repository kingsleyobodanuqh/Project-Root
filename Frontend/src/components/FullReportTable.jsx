import React, { useEffect, useState } from "react";

function FullReportTable() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/reports/full")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching logs:", err);
        setError("Failed to load data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-600">Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mt-6 bg-white shadow rounded overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">Group</th>
            <th className="px-4 py-2 border">Device</th>
            <th className="px-4 py-2 border">Last Up</th>
            <th className="px-4 py-2 border">Downtime</th>
            <th className="px-4 py-2 border">Time Logged</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800">
          {logs.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{item.group}</td>
              <td className="px-4 py-2 border">{item.device}</td>
              <td className="px-4 py-2 border">{item.last_up}</td>
              <td className="px-4 py-2 border">{item.downtime}</td>
              <td className="px-4 py-2 border">{item.recorded_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FullReportTable;
