import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [report, setReport] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/reports/full")
      .then(response => setReport(response.data))
      .catch(err => console.error("Error fetching report", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Overview of PRTG Monitored Servers</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Live Server Reports</h3>
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Group</th>
              <th className="px-4 py-2 border">Device</th>
              <th className="px-4 py-2 border">Last Up</th>
              <th className="px-4 py-2 border">Downtime</th>
            </tr>
          </thead>
          <tbody>
            {report.length > 0 ? report.map((entry, index) => (
              <tr key={index} className="text-sm text-gray-700">
                <td className="px-4 py-2 border">{entry.group_name}</td>
                <td className="px-4 py-2 border">{entry.device}</td>
                <td className="px-4 py-2 border">{entry.last_up}</td>
                <td className="px-4 py-2 border">{entry.downtime}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="text-center py-4">Loading report data...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
