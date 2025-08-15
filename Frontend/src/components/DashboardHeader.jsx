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

  if (loading) return <p style={{ color: '#64748b' }}>Loading stats...</p>;
  if (error) return <p style={{ color: '#ef4444' }}>Error: {error}</p>;
  if (!stats) return <p style={{ color: '#64748b' }}>No stats available.</p>;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24,
      marginBottom: 32,
      alignItems: 'stretch',
      flexWrap: 'wrap',
    }}>
      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 500, color: '#64748b', margin: 0 }}>Total Devices</h3>
        <p style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{stats.total_devices}</p>
      </div>
      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 500, color: '#64748b', margin: 0 }}>Critical Devices</h3>
        <p style={{ fontSize: 28, fontWeight: 700, color: '#ef4444', margin: 0 }}>{stats.critical_devices}</p>
      </div>
      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 500, color: '#64748b', margin: 0 }}>Avg Downtime</h3>
        <p style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{stats.average_downtime_days} days</p>
      </div>
      <div className="card">
        <h3 style={{ fontSize: 16, fontWeight: 500, color: '#64748b', margin: 0 }}>Last Update</h3>
        <p style={{ fontSize: 16, margin: 0 }}>{stats.last_updated}</p>
      </div>
      <div style={{ gridColumn: '1 / -1', textAlign: 'right', marginTop: 8 }}>
        <button
          onClick={handleRunReport}
          className="button"
          style={{ padding: '12px 28px', fontSize: 16 }}
        >
          Run Report
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;
