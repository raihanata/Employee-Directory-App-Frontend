/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useRouter } from "next/navigation";
import { gql } from "@apollo/client";
import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from "@apollo/client/react";

const AddEmployee = () => {
    const router = useRouter()

    const ADD_EMPLOYEE = gql`mutation AddEmployee($name: String!, $position: String!, $department: String!, $salary: Int!) {
            addEmployee(name: $name, position: $position, department: $department, salary: $salary) {
                id  
            }
            }`

    const GET_EMPLOYEES_BY_DEPT = gql`
  query getEmployeesByDepartment($department: String!) {
    getEmployeesByDepartment(department: $department) {
      id
      name
      position
    }
  }
`;
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        department: "",
        salary: 0,
    });

    const [errors, setErrors] = useState({});
    const [addEmployee, { loading }] = useMutation(ADD_EMPLOYEE);
    const [selectedDept, setSelectedDept] = useState("");
    const [getEmployees, { data, loading: tableLoading }] = useLazyQuery(GET_EMPLOYEES_BY_DEPT);

     useEffect(() => {
     if (selectedDept) getEmployees({ variables: { department: selectedDept } });
     }, [selectedDept, getEmployees]);
     
    const handleChange = (e: any) => {

        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "salary" ? parseInt(value) : value
        }));

    };
    const validate = () => {
        const newErrors: any = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.position.trim()) newErrors.position = "Position is required";
        if (!formData.department.trim()) newErrors.department = "Select department";
        if (!formData.salary || isNaN(formData.salary)) newErrors.salary = "Enter valid salary";
        setErrors(newErrors);
        console.log(newErrors, 'err')
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await addEmployee({
                variables: {
                    name: formData.name,
                    position: formData.position,
                    department: formData.department,
                    salary: formData.salary as number
                },
            });

            alert("Employee added successfully!");
            router.push("/");

        } catch (err) {
            console.error("Error ", err);
            alert(" wrong. Try again!");
        }
    };


    return (
        <div className='p-6'>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Employee</h1>
            <form className="bg-gray-50 shadow-md  p-6 max-w-md space-y-4">
                <div>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter employee name"
                        className="border rounded w-full  p-2 mb-4 focus:ring focus:ring-blue-200"
                    />
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="Enter position"
                        className="border rounded w-full p-2 mb-4 focus:ring focus:ring-blue-200"
                    />

                    <select

                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="border rounded w-full p-2 focus:ring mb-4 focus:ring-blue-200"
                    >
                        <option value="">Select department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="HR">HR</option>
                        <option value="Sales">Sales</option>
                    </select>
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="Enter salary"
                        className="border rounded w-full p-2 focus:ring mb-4 focus:ring-blue-200"
                    />
                    <div className='mb-4 flex items-center justify-between'>
                        <button
                            type="submit"
                            onClick={() => router.back()}
                            className="bg-red-600 text-white px-4 py-2 rounded "
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            Save
                        </button></div>
                </div>
            </form>
        </div>
    )
}

export default AddEmployee