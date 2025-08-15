// frontend/src/pages/Home.js
import React, { useState } from "react";
import FullReportTable from "../components/FullReportTable";
import RunReportButton from "../components/RunReportButton";
import CriticalReportTable from "../components/CriticalReportTable";
import SummaryCards from "../components/SummaryCards";

function Home() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Trigger re-render
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#22223b', margin: 0, textAlign: 'left', letterSpacing: '-1px' }}>
          Network Monitoring Dashboard
        </h1>
        <div>
          <RunReportButton onSuccess={handleRefresh} />
        </div>
      </div>

      {/* Summary Cards 2x2 grid, centered */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <SummaryCards layout="2x2" />
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#22223b', margin: '48px 0 16px 0', textAlign: 'center', letterSpacing: '-0.5px' }}>
        Live Device Reports
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <FullReportTable key={refresh} />
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#ef4444', margin: '48px 0 16px 0', textAlign: 'center', letterSpacing: '-0.5px' }}>
        Critical Devices
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <CriticalReportTable />
      </div>
    </div>
  );
}

export default Home;
