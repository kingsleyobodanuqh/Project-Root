// frontend/src/components/CriticalReportTable.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function CriticalReportTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/reports/critical")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching critical report:", err);
        setError("Failed to load critical report data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-500">Loading critical data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Critical Devices (≤ 15d Downtime)</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Server Name</th>
              <th className="py-2 px-4 text-left">IP Address</th>
              <th className="py-2 px-4 text-left">Downtime</th>
              <th className="py-2 px-4 text-left">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {data.map((device, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{device.group_name}</td>
                <td className="py-2 px-4">{device.device_ip}</td>
                <td className="py-2 px-4">{device.downtime}</td>
                <td className="py-2 px-4">{device.recorded_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CriticalReportTable;
