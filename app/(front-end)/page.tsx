import EmployeeTable from "../components/employeeTable";


export default function EmployeesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4"> Employee Directory Application</h1>
      <EmployeeTable />
    </div>
  );
}
