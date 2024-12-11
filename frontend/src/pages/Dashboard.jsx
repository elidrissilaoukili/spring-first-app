import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL || "Environment variable not found";
  const [employees, setEmployees] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null); // Track the current employee to be updated
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
  });

  const openModal = (employeeId) => {
    setCurrentEmployeeId(employeeId); // Set the current employee ID
    setIsOpened(true);
    const employeeToEdit = employees.find(emp => emp.id === employeeId);
    if (employeeToEdit) {
      setFormData({
        name: employeeToEdit.name,
        email: employeeToEdit.email,
        phone: employeeToEdit.phone,
        department: employeeToEdit.department,
      });
    }
  };

  const closeModal = () => {
    setIsOpened(false);
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getAllEmployees = async () => {
    try {
      const response = await axios.get(`${baseURL}/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  const updateEmp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${baseURL}/employee/${currentEmployeeId}`, formData);
      // console.log(`Employee with ID ${currentEmployeeId} updated successfully.`, response.data);
      getAllEmployees();
      setIsOpened(false);
    } catch (error) {
      console.error("Error updating employee:", error.message);
    }
  };

  const deleteEmp = async (e, empId) => {
    e.preventDefault();
    try {
      await axios.delete(`${baseURL}/employee/${empId}`);
      console.log(`Employee with ID ${empId} deleted successfully.`);
      getAllEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error.message);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <>
      <div className="text-2xl font-semibold mb-6">Dashboard</div>

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Email</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Phone</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Department</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Delete</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Update</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id} className="border-t border-gray-200">
                <td className="px-4 py-2 text-sm">{employee.name}</td>
                <td className="px-4 py-2 text-sm">{employee.email}</td>
                <td className="px-4 py-2 text-sm">{employee.phone}</td>
                <td className="px-4 py-2 text-sm">{employee.department}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={(e) => deleteEmp(e, employee.id)}
                  >
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => openModal(employee.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center text-sm text-gray-500">
                No employees found!
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isOpened && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form onSubmit={updateEmp} className="space-y-4 bg-white p-6 shadow-md rounded-md w-full max-w-lg">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                name="department"
                id="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Update
            </button>

            <button
              type="button"
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
              onClick={closeModal}
            >
              close
            </button>
          </form>
        </div>
      )}

    </>

  );
}

export default Dashboard;
