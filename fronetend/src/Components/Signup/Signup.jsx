import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../Signup/Signup.css';

export default function Signup({ handleSignup }) {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e, setter, validationRegex = /.*/, maxLength = null) => {
        const { value } = e.target;
        if (validationRegex.test(value) && (maxLength === null || value.length <= maxLength)) {
            setter(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        if (!/^[A-Za-z\s]+$/.test(name)) {
            alert('Please enter a valid name with only letters and spaces.');
            return;
        }

        if (!/^[A-Za-z\s]+$/.test(userName)) {
            alert('Please enter a valid username with only letters and spaces.');
            return;
        }

        if (!/^\d{10}$/.test(contactNumber)) {
            alert('Contact number must be exactly 10 digits.');
            return;
        }

        sendRequest();
    };

    const sendRequest = async () => {
        try {
            const response = await Axios.post('http://localhost:3001/users/adduser', {
                name: name,
                userName: userName,
                password: password,
                contactNumber: contactNumber,
                address: address,
                role: role,
                email: email
            });

            if (response.status === 200) {
                console.log('User created successfully:', response.data);
                navigate('/login');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="SignupMain">
            <form className="SignupForm" onSubmit={handleSubmit}>
                <h1 className="SignupH1">Sign Up</h1>

                <input
                    className="SignupInput"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleInputChange(e, setName, /^[A-Za-z\s]*$/)}
                    placeholder="Full Name"
                />
                <br />

                <input
                    className="SignupInput"
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => handleInputChange(e, setUserName, /^[A-Za-z\s]*$/)}
                    placeholder="Username"
                />
                <br />

                <input
                    className="SignupInput"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <br />

                <input
                    className="SignupInput"
                    type="text"
                    required
                    value={contactNumber}
                    onChange={(e) => handleInputChange(e, setContactNumber, /^[0-9]*$/, 10)}
                    placeholder="Contact Number"
                />
                <br />

                <input
                    className="SignupInput"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => handleInputChange(e, setAddress, /^[A-Za-z0-9\\\s]*$/)}
                    placeholder="Address"
                />

                <br />
                <input
                    className="SignupInput"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                />
                <br />

                <select
                    className="SignupInput"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                </select>
                <br />

                <button className="LoginButton" type="submit">Sign Up</button>
                <span>Already a user?</span>
                <button className="LoginButton" onClick={() => navigate('/login')}>Log in</button>
            </form>
        </div>
    );
}
