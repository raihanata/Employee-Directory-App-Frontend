    'use client';
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  const addEmployee = ()=>{
router.push("/add-employee")
   
  }
  return (
   <main className="p-6 flex items-center justify-center text-center ">
    <div className=" bg-gray-50 ">

       <h1 className="pb-7">Employee management Directory</h1>
    <div className="flex items-center justify-around mb-6">
       <div className="px-1">
        <label htmlFor=""></label>
        <select
          id="department"
          // value={department}
          // onChange={(e) => setDepartment(e.target.value)}
          className="border px-3 py-2 rounded-md text-gray-700 focus:outline-none"
        >
          <option>All</option>
          <option>IT</option>
          <option>Sales</option>
          <option>HR</option>
          <option>Marketing</option>
        </select>
       </div>
      <button className="bg-red-600 text-white px-1 py-2 rounded hover:bg-red-700 transition" onClick={addEmployee}>
           + Add New Employee
      </button>
    </div>
    <div className="flex items-center justify-center">
      <table >
       <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Position</th>
           </tr>
        </thead>
         <tbody>
          <tr className="hover:bg-gray-50 border-b">
              <td className="px-4 py-3">Alice Johnson</td>
              <td className="px-4 py-3">Developer</td>
             
            </tr>
         </tbody>
      </table>
    </div>
    <div className="flex items-center justify-around mb-6 pt-6">
      
      <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
      Employee Details    
      </button>
      </div>
    </div>
   </main>
  );
}
