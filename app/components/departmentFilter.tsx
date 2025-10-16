/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const departments = ["All", "Engineering", "HR", "Sales", "Marketing"];

const EmployeeFilter = ({ selectedDept, onSelectDept, searchQuery, onSearchChange }: any) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
      {/* Department Filter */}
      <select
        value={selectedDept}
        onChange={(e) => onSelectDept(e.target.value)}
        className="border p-2 rounded"
      >
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border p-2 rounded flex-1"
      />
    </div>
  );
};

export default EmployeeFilter;
