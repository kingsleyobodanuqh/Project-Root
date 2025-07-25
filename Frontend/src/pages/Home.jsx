// frontend/src/pages/Home.js
import React, { useState } from "react";
import FullReportTable from "../components/FullReportTable";
import RunReportButton from "../components/RunReportButton";

function Home() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Trigger re-render
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Network Monitoring Dashboard</h1>

      <RunReportButton onSuccess={handleRefresh} />

      <h2 className="text-xl font-semibold mt-6">Live Device Reports</h2>
      <FullReportTable key={refresh} />
    </div>
  );
}

export default Home;
