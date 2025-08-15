// ReportSection.jsx
// Matches the report section from the JSON design
import React from "react";

const ReportSection = ({ title, columns, searchValue, onSearchChange, groupOptions, groupValue, onGroupChange, children }) => (
  <div className="bg-white rounded-lg border border-gray-200">
    {/* Header */}
    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm w-64"
            placeholder="Search devices..."
            value={searchValue}
            onChange={onSearchChange}
          />
          <div className="absolute right-3 top-2.5 text-gray-400">🔍</div>
        </div>
        {/* Group Select */}
        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
          value={groupValue}
          onChange={onGroupChange}
        >
          {groupOptions.map((opt, idx) => (
            <option key={idx} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
    {/* Columns */}
    <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
      <div className="grid grid-cols-6 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
        {columns.map((col, idx) => (
          <div key={idx}>{col}</div>
        ))}
      </div>
    </div>
    {/* Table or No Data */}
    {children}
  </div>
);

export default ReportSection;
