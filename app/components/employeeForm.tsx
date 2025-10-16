"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { GET_EMPLOYEE } from "../graphql/queries";
import { ADD_EMPLOYEE } from "../graphql/mutations";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const positions = ["Manager", "Developer", "Designer", "HR Specialist", "Sales Executive"];
const departments = ["Engineering", "HR", "Sales", "Marketing"];

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    salary: "",
  });

  const [addEmployee, { loading }] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEE }], // refresh the list after add
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addEmployee({
        variables: {
          name: formData.name,
          position: formData.position,
          department: formData.department,
          salary: parseInt(formData.salary),
        },
      });
      setFormData({ name: "", position: "", department: "", salary: "" });
      onClose();
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-2 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Position</label>
            <select
              name="position"
              required
              value={formData.position}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Position</option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Department</label>
            <select
              name="department"
              required
              value={formData.department}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Salary</label>
            <input
              type="number"
              name="salary"
              required
              value={formData.salary}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-800 disabled:opacity-50 w-full"
          >
            {loading ? "Adding..." : "Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
