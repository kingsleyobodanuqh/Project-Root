import React, { useState } from "react";
import axios from "axios";

const RunReportButton = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleRunReport = async () => {
    setLoading(true);
    setStatus("");

    try {
      const response = await axios.post("http://localhost:8000/generate-report");
      if (response.data.status === "success") {
        setStatus("Report generated successfully.");
      } else {
        setStatus("Report failed: " + response.data.message);
      }
    } catch (error) {
      setStatus("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="my-4">
      <button
        onClick={handleRunReport}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        disabled={loading}
      >
        {loading ? "Generating..." : "Run Report"}
      </button>
      {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
    </div>
  );
};

export default RunReportButton;
