
import React, { useState, useEffect } from "react";
import axios from "axios";
import './CalculateOT.css';

const OvertimeCalculator = () => {
  const [data, setData] = useState({
    employees: [],
    selectedEmployee: null,
    hours: "",
    rate: "",
    salary: 0,
    overtimeAmount: 0,
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        const employeesList = response.data.users.filter(user => user.role === 'employee');
        setData(prevData => ({ ...prevData, employees: employeesList }));
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "employee") {
      const employee = data.employees.find(emp => emp._id === value);
      setData(prevData => ({
        ...prevData,
        selectedEmployee: employee,
        salary: employee ? parseFloat(employee.salary) : 0,
        overtimeAmount: 0,
        hours: "",
        rate: "",
      }));
    } else {
      setData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const calculateOvertime = () => {
    const hoursNumber = parseFloat(data.hours);
    const ratePercentage = parseFloat(data.rate);

    if (!hoursNumber || hoursNumber < 1 || hoursNumber > 8) {
      alert("Overtime hours must be between 1 and 8.");
      return;
    }

    if (isNaN(ratePercentage) || ratePercentage < 1 || ratePercentage > 100) {
      alert("Please enter valid  rate percentage (1-100).");
      return;
    }

    const overtime = data.salary * hoursNumber * (ratePercentage / 100);
    setData(prevData => ({
      ...prevData,
      overtimeAmount: overtime,
    }));
    alert(`Overtime Payment Amount: $${overtime.toFixed(2)}`);
  };

  const saveTotalSalaryWithOT = async () => {
   
    const totalSalaryWithOT = data.salary + data.overtimeAmount;

    try {
      await axios.put(`http://localhost:3001/users/${data.selectedEmployee._id}`, {
        total_salary_with_OT: totalSalaryWithOT.toFixed(2),
      });
      alert("Total salary with overtime has been successfully updated!");
    } catch (error) {
      console.error("Error updating total salary with overtime:", error);
      alert("Error updating total salary. Please try again.");
    }
  };

  return (
    <div className="overtime-calculator">
      <h1>Overtime Payment Calculator</h1>
      <div>
        <label htmlFor="employee">Select Employee:</label>
        <select id="employee" name="employee" onChange={handleChange}>
          <option value="">--Select an Employee--</option>
          {data.employees.map(employee => (
            <option key={employee._id} value={employee._id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>

      {data.selectedEmployee && (
        <div>
          <p><strong>Selected Employee Salary:</strong> ${data.salary.toFixed(2)}</p>
          <div>
            <label htmlFor="hours">Overtime Hours(1-8):</label>
            <input
              id="hours"
              name="hours"
              type="number"
              value={data.hours}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="rate">Overtime Rate (% of salary):</label>
            <input
              id="rate"
              name="rate"
              type="number"
              value={data.rate}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </div>
          <button onClick={calculateOvertime}>Calculate Overtime</button>
          <h2>Total salary including overtime: ${(data.salary + data.overtimeAmount).toFixed(2)}</h2>
          <button onClick={saveTotalSalaryWithOT}>Save Total Salary with Overtime</button>
        </div>
      )}
    </div>
  );
};

export default OvertimeCalculator;
