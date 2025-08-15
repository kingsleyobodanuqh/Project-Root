// Reports.jsx
// Main page for the PRTG Network Monitor UI, matching the provided JSON design
import React, { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import ErrorAlert from "../components/ErrorAlert";
import StatsCard from "../components/StatsCard";
import ReportSection from "../components/ReportSection";

// Placeholder stats data
const stats = {
  total: 0,
  critical: 0,
  avg: "0 days",
  last: "No data",
};

// Placeholder report columns
const reportColumns = [
  "GROUP",
  "DEVICE",
  "LAST UP",
  "DOWNTIME",
  "STATUS",
  "RECORDED",
];

// Placeholder group options
const groupOptions = [
  { value: "all", label: "🔽 All Groups" },
];

function Reports() {
  // Error state (simulate error for demo)
  const [error, setError] = useState(true);

  // Search and group filter states
  const [criticalSearch, setCriticalSearch] = useState("");
  const [criticalGroup, setCriticalGroup] = useState("all");
  const [fullSearch, setFullSearch] = useState("");
  const [fullGroup, setFullGroup] = useState("all");

  // Placeholder for report data
  // Replace with live data later
  const criticalReportData = [];
  const fullReportData = [];

  // Run Report button handler
  const handleRunReport = () => {
    // TODO: Trigger backend report
    alert("Run Report triggered!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <HeaderBar onRunReport={handleRunReport} />

        {/* Error Alert (show only if error) */}
        {error && (
          <ErrorAlert message="An error occurred while fetching data" />
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard type="total" title="Total Devices" value={stats.total} subtitle="Monitored devices" />
          <StatsCard type="critical" title="Critical Devices" value={stats.critical} subtitle="≤ 15 days downtime" />
          <StatsCard type="avg" title="Avg Downtime" value={stats.avg} subtitle="Across all devices" />
          <StatsCard type="last" title="Last Update" value={stats.last} subtitle="Data refresh time" />
        </div>

        {/* Reports Sections */}
        <div className="space-y-6">
          {/* Critical Devices Report */}
          <ReportSection
            title={`Critical Devices Report (${criticalReportData.length})`}
            columns={reportColumns}
            searchValue={criticalSearch}
            onSearchChange={(e) => setCriticalSearch(e.target.value)}
            groupOptions={groupOptions}
            groupValue={criticalGroup}
            onGroupChange={(e) => setCriticalGroup(e.target.value)}
          >
            {/* No data available placeholder */}
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500 text-sm">No data available</p>
            </div>
          </ReportSection>

          {/* Full Network Report */}
          <ReportSection
            title={`Full Network Report (${fullReportData.length})`}
            columns={reportColumns}
            searchValue={fullSearch}
            onSearchChange={(e) => setFullSearch(e.target.value)}
            groupOptions={groupOptions}
            groupValue={fullGroup}
            onGroupChange={(e) => setFullGroup(e.target.value)}
          >
            {/* No data available placeholder */}
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500 text-sm">No data available</p>
            </div>
          </ReportSection>
        </div>
      </div>
    </div>
  );
}

export default Reports;
