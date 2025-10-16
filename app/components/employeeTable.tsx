/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEE } from "../graphql/queries"; // adjust path
import EmployeeFilter from "./departmentFilter";

const EmployeeTable = () => {
  const { data, loading, error } = useQuery(GET_EMPLOYEE);

  const [selectedDept, setSelectedDept] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // rows per page

  // Filtered employees based on department & search
  const filteredEmployees = useMemo(() => {
    if (!data?.getAllEmployees) return [];
    return data.getAllEmployees.filter((emp: any) => {
      const matchesDept = selectedDept === "All" || emp.department === selectedDept;
      const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDept && matchesSearch;
    });
  }, [data, selectedDept, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) return <div>Loading employees...</div>;
  if (error) return <div>Error loading employees</div>;

  return (
    <div>
      <EmployeeFilter
        selectedDept={selectedDept}
        onSelectDept={(dept: any) => {
          setSelectedDept(dept);
          setCurrentPage(1); // reset page
        }}
        searchQuery={searchQuery}
        onSearchChange={(query: any) => {
          setSearchQuery(query);
          setCurrentPage(1); // reset page
        }}
      />

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Position</th>
            <th className="border px-4 py-2">Department</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center p-4">
                No employees found.
              </td>
            </tr>
          ) : (
            paginatedEmployees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{emp.name}</td>
                <td className="border px-4 py-2">{emp.position}</td>
                <td className="border px-4 py-2">{emp.department}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
