
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './AddUser.css';

export default function AddUser() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    userName: "",
    password: "",
    contactNumber: "",
    address: "",
    role: "",
    email: "",
    salary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
      case "userName":
      case "role":
        if (/^[A-Za-z\s]*$/.test(value) || value === "") {
          setInputs((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;

      case "address":
        if (/^[A-Za-z0-9\\\s/]*$/.test(value) || value === "") {
          setInputs((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;

      case "contactNumber":
        if (/^[0-9]*$/.test(value) && (value.length <= 10)) {
          setInputs((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;

      case "salary":
        if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
          setInputs((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;

      case "email":
        setInputs((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;

      default:
        setInputs((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(inputs.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (inputs.contactNumber.length !== 10) {
      alert("Contact number must be exactly 10 digits.");
      return;
    }

    console.log(inputs);
    sendRequest().then(() => history("/user/userDetails"));
  };

  const formatSalary = (salary) => {
    const parsedSalary = parseFloat(salary);

    if (isNaN(parsedSalary)) return "0.00";
    return parsedSalary.toFixed(2);
  };

  const sendRequest = async () => {
    try {
      await axios.post("http://localhost:3001/users/adduser", {
        name: String(inputs.name),
        userName: String(inputs.userName),
        password: String(inputs.password),
        contactNumber: String(inputs.contactNumber),
        address: String(inputs.address),
        role: String(inputs.role),
        email: String(inputs.email),
        salary: formatSalary(inputs.salary),
      });
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="add-user-container">
      <h1>Add Employee</h1>

      <form onSubmit={handleSubmit} className="add-user-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={inputs.name}
          required
        />

        <label>Username</label>
        <input
          type="text"
          name="userName"
          onChange={handleChange}
          value={inputs.userName}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={inputs.password}
          required
        />


        <label>Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          onChange={handleChange}
          value={inputs.contactNumber}
          required
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          onChange={handleChange}
          value={inputs.address}
          required
        />

        <label>Role</label>
        <select
          name="role"
          onChange={handleChange}
          value={inputs.role}
          required
        >
          <option value="" disabled>Select a role</option>
          <option value="employee">Employee</option>
        </select>

        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={inputs.email}
          required
        />

        <label>Salary</label>
        <input
          type="text"
          name="salary"
          onChange={handleChange}
          value={inputs.salary}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
