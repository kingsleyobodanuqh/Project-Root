// StatsCard.jsx
// Matches the stats card section from the JSON design
import React from "react";

const iconMap = {
  total: { icon: "📊", bg: "#e0e7ff", color: "#6366f1" },
  critical: { icon: "⚠️", bg: "#fee2e2", color: "#ef4444" },
  avg: { icon: "⏱️", bg: "#fef9c3", color: "#eab308" },
  last: { icon: "🔄", bg: "#dcfce7", color: "#22c55e" },
};

const StatsCard = ({ type, title, value, subtitle }) => (
  <div className="card" style={{ padding: 24, border: '1px solid #e5e7eb', borderRadius: 12 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
      <h3 style={{ fontSize: 16, fontWeight: 500, color: '#64748b', margin: 0 }}>{title}</h3>
      <div style={{ width: 32, height: 32, background: iconMap[type].bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: iconMap[type].color, fontSize: 18 }}>{iconMap[type].icon}</span>
      </div>
    </div>
    <div style={{ fontSize: 32, fontWeight: 700, color: '#22223b', marginBottom: 4 }}>{value}</div>
    <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{subtitle}</p>
  </div>
);

export default StatsCard;
