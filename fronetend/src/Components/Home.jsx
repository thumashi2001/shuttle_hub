
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="home-container">
            <header>
                <h1>Welcome to Employee Management System</h1>
                <p className="user-welcome">Hello, {user.userName}!</p>
            </header>
            <section className="content-section">
                <div className="project-description">
                    <h2>About This System</h2>
                    <p>
                        The Employee Management System is designed to help administrators manage employee data efficiently.
                        You can perform various actions such as creating, updating, and deleting employee records,
                        generating reports, and much more.
                    </p>
                    <p>
                        Explore the features of this system using the navigation options below. Each section allows you to manage
                        different aspects of employee information and administrative tasks.
                    </p>
                </div>

                {user.role === 'admin' && (
                    <nav className="navigation-section">
                        <h3>Navigation</h3>
                        <ul className="navigation-links">
                            <li>
                                <Link to="/user/UserDetails">Manage Employees</Link>
                            </li>
                        </ul>
                    </nav>
                )
            }
            </section>
            <footer>
                <p>&copy; 2024 Employee Management System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
