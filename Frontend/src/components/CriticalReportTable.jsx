// frontend/src/components/CriticalReportTable.jsx

import React, { useEffect, useState } from "react";

function CriticalReportTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("downtime");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/reports/critical")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch critical report");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load critical report data.");
        setLoading(false);
      });
  }, []);

  // Filtering
  const filteredData = data.filter(
    (item) =>
      item.group_name?.toLowerCase().includes(search.toLowerCase()) ||
      item.device_ip?.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (!a[sortBy] || !b[sortBy]) return 0;
    if (sortDir === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Loading/Error states
  if (loading)
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 128 }}>
        <svg style={{ animation: "spin 1s linear infinite", height: 32, width: 32, color: "#ef4444", marginRight: 8 }} viewBox="0 0 24 24">
          <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <span style={{ color: "#64748b" }}>Loading critical report...</span>
      </div>
    );
  if (error)
    return <p style={{ color: "#ef4444", textAlign: "center", marginTop: 16 }}>{error}</p>;

  return (
    <div className="dashboard-container">
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24, gap: 16, flexWrap: "wrap" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: "#ef4444" }}>Critical Devices (≤ 15d Downtime)</h2>
        <input
          type="text"
          placeholder="Search by group or IP..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="input"
          style={{ minWidth: 220, marginLeft: 8 }}
        />
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="styled-table">
          <thead>
            <tr>
              {[
                { key: "group_name", label: "Server Name" },
                { key: "device_ip", label: "IP Address" },
                { key: "downtime", label: "Downtime" },
                { key: "recorded_at", label: "Last Updated" },
              ].map((col) => (
                <th
                  key={col.key}
                  style={{ cursor: "pointer", userSelect: "none" }}
                  onClick={() => {
                    if (sortBy === col.key) {
                      setSortDir(sortDir === "asc" ? "desc" : "asc");
                    } else {
                      setSortBy(col.key);
                      setSortDir("asc");
                    }
                  }}
                >
                  {col.label}
                  {sortBy === col.key && (
                    <span style={{ marginLeft: 4, fontSize: 12 }}>{sortDir === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "24px", color: "#6b7280" }}>
                  No critical devices found.
                </td>
              </tr>
            ) : (
              paginatedData.map((device, idx) => (
                <tr key={idx}>
                  <td>{device.group_name}</td>
                  <td>{device.device_ip}</td>
                  <td>{device.downtime}</td>
                  <td>{device.recorded_at}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 24, gap: 8 }}>
        <button
          className="button"
          style={{ padding: "8px 20px", fontSize: 14, marginRight: 8 }}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span style={{ fontSize: 14 }}>
          Page {page} of {totalPages}
        </span>
        <button
          className="button"
          style={{ padding: "8px 20px", fontSize: 14, marginLeft: 8 }}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CriticalReportTable;
