/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import EmployeeFilter from "./departmentFilter";

import { gql } from "@apollo/client";
import Link from "next/link";
import { GET_EMPLOYEE } from "../graphql/queries";
import AddEmployeeModal from "./employeeForm";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'


interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
}

interface GetAllEmployeesData {
  getAllEmployees: Employee[];
}

const EmployeeTable = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  
  const closeModal = () => setIsModalOpen(false);
  const { data, loading, error } = useQuery<GetAllEmployeesData>(GET_EMPLOYEE);

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
      <div className="grid grid-cols-2">
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
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Employee
        </button>
      </div>
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
            paginatedEmployees.map((emp: any) => (
              <tr key={emp.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">
                    
                <Link href={`/employee/${emp.id}`} className="text-blue-600 hover:underline">
                {emp.name}
                </Link>
                </td>
                <td className="border px-4 py-2">{emp.position}</td>
                <td className="border px-4 py-2">{emp.department}</td>
                <td className="border px-4 py-2">
                    <Link href={`/employee/${emp.id}`}>view</Link>
                </td>
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
      <AddEmployeeModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default EmployeeTable;
