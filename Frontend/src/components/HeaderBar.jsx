// HeaderBar.jsx
// Matches the header section from the JSON design
import React from "react";

const HeaderBar = ({ onRunReport }) => (
  <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
    {/* Left: Logo and Title */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 32, height: 32, background: '#6366f1', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#fff', fontSize: 18 }}>⚡</span>
      </div>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#22223b', margin: 0 }}>PRTG Network Monitor</h1>
        <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>Real-time network device monitoring</p>
      </div>
    </div>
    {/* Right: Run Report Button */}
    <button
      className="button"
      style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500, fontSize: 16, padding: '12px 28px' }}
      onClick={onRunReport}
    >
      <span>▶</span>
      <span>Run Report</span>
    </button>
  </header>
);

export default HeaderBar;
