import React, { useEffect, useState } from "react";
import axios from "axios";

function SummaryCards({ layout }) {
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

  if (!stats) return <p style={{ color: '#64748b' }}>Loading summary...</p>;

  const gridStyle = layout === "2x2"
    ? {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: 24,
        margin: '32px 0',
        maxWidth: 600,
        width: '100%',
        alignItems: 'stretch',
        justifyItems: 'center',
      }
    : {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 24,
        margin: '32px 0',
        alignItems: 'stretch',
        flexWrap: 'wrap',
      };
  return (
    <div style={gridStyle}>
      <div className="card" style={{ textAlign: 'center', width: '100%' }}>
        <h3 style={{ fontSize: 16, fontWeight: 500, color: '#64748b', margin: 0 }}>Total Devices</h3>
        <p style={{ fontSize: 24, fontWeight: 700, color: '#6366f1', margin: 0 }}>{stats.total_devices}</p>
      </div>
      <div className="card" style={{ textAlign: 'center', width: '100%' }}>
        <h3 style={{ fontSize: 16, fontWeight: 500, color: '#64748b', margin: 0 }}>Critical Devices</h3>
        <p style={{ fontSize: 24, fontWeight: 700, color: '#ef4444', margin: 0 }}>{stats.critical_devices}</p>
      </div>
      <div className="card" style={{ textAlign: 'center', width: '100%' }}>
        <h3 style={{ fontSize: 16, fontWeight: 500, color: '#64748b', margin: 0 }}>Avg. Downtime (days)</h3>
        <p style={{ fontSize: 24, fontWeight: 700, color: '#eab308', margin: 0 }}>{stats.average_downtime_days}</p>
      </div>
      <div className="card" style={{ textAlign: 'center', width: '100%' }}>
        <h3 style={{ fontSize: 16, fontWeight: 500, color: '#64748b', margin: 0 }}>Last Updated</h3>
        <p style={{ fontSize: 16, fontWeight: 600, color: '#22223b', margin: 0 }}>{stats.last_updated}</p>
      </div>
    </div>
  );
}

export default SummaryCards;
