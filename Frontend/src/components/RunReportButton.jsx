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

<div style={{ margin: '24px 0' }}>
      <button
        onClick={handleRunReport}
        className="button"
        style={{ padding: '12px 28px', fontSize: 16 }}
        disabled={loading}
      >
        {loading ? "Generating..." : "Run Report"}
      </button>
      {status && <p style={{ marginTop: 12, fontSize: 14, color: '#64748b' }}>{status}</p>}
    </div>
  );
};

export default RunReportButton;
