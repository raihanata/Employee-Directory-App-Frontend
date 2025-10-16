/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { useQuery } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { GET_EMPLOYEE_DETAILS } from '@/app/graphql/queries';

interface EmployeeViewProps {
  params: {
    id: string;
  };
}

const EmployeeView: React.FC<EmployeeViewProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  const { data, loading, error } = useQuery<any>(GET_EMPLOYEE_DETAILS    , {
    variables: { getEmployeeDetailsId: id },
  });

  if (loading)
    return <div className="p-6 text-gray-600 text-center">Loading employee details...</div>;

  if (error)
    return (
      <div className="p-6 text-red-600 text-center">
        Error fetching employee details: {error.message}
      </div>
    );

  const employee = data?.getEmployeeDetails; // assuming it returns an array (based on your schema)

  if (!employee)
    return <div className="p-6 text-gray-600 text-center">No employee found.</div>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <button
        onClick={() => router.push('/')}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Home
      </button>

      <h2 className="text-2xl font-semibold mb-4">Employee Details</h2>

      <div className="space-y-3">
        <p>
          <span className="font-medium text-gray-700">Name:</span> {employee.name}
        </p>
        <p>
          <span className="font-medium text-gray-700">Position:</span> {employee.position}
        </p>
        <p>
          <span className="font-medium text-gray-700">Department:</span> {employee.department}
        </p>
        <p>
          <span className="font-medium text-gray-700">Salary:</span> ₹{employee.salary}
        </p>
      </div>
    </div>
  );
};

export default EmployeeView;
