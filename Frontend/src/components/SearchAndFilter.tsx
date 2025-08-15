/**
 * SearchAndFilter component - search input and dropdown filter
 */
import React from 'react';

interface SearchAndFilterProps {
  search: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filter: string;
  onFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  filterOptions: { value: string; label: string }[];
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ search, onSearch, filter, onFilter, filterOptions }) => (
  <div className="flex items-center space-x-4">
    <div className="relative">
      <input
        type="text"
        className="border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm w-64"
        placeholder="Search devices..."
        value={search}
        onChange={onSearch}
        aria-label="Search devices"
      />
      <div className="absolute right-3 top-2.5 text-gray-400" aria-hidden="true">🔍</div>
    </div>
    <select
      className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
      value={filter}
      onChange={onFilter}
      aria-label="Filter by group"
    >
      {filterOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export default SearchAndFilter;
