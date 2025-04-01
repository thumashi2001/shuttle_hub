import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './UpdateUser.css';

function UpdateUser() {
  const [inputs, setInputs] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:3001/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/users/${id}`, {
        name: String(inputs.name),
        userName: String(inputs.userName),
        password: String(inputs.password),
        contactNumber: String(inputs.contactNumber),
        address: String(inputs.address),
        email: String(inputs.email),
        
        salary: Number(inputs.salary).toFixed(2),
      });
      return response.data; 
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message); 
      } else {
        alert("An error occurred while updating the user."); 
      }
      throw error; 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
      case "userName":
        if (/^[A-Za-z\s]*$/.test(value) || value === "") {
          setInputs((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;

      case "contactNumber":
        if (/^\d{0,10}$/.test(value)) {
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
    sendRequest().then(() => navigate("/user/userDetails"));
  };

  const handleBack = () => {
    navigate("/user/userDetails");
  };

  return (
    <div className="update-user-container">
      <h1>Update Employee</h1>

      <form onSubmit={handleSubmit} className="update-user-form">
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
          type={showPassword ? "text" : "password"}
          name="password"
          onChange={handleChange}
          value={inputs.password}
          required
        />

        <input
          type="checkbox"
          onChange={() => setShowPassword(!showPassword)}
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
        />

        <div className="update-user-buttons">
          <button type="button" className="back-button" onClick={handleBack}>
            Back
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
