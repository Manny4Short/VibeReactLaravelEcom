import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header.js';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/add');
        }
    }, [navigate]);

    async function login() {
        // Prevent the default form submission
        // e.preventDefault(); // Uncomment if you're using a form element

        console.warn(email, password);        
        let item = { email, password };

        try {
            let result = await fetch("http://localhost:8000/api/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item),
            });

            let data = await result.json();

            if (result.ok) { // Check if the response status is OK
                // Store user info including role
                localStorage.setItem("user-info", JSON.stringify({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    role: data.role // Store the role from the backend
                }));

                // Navigate to another page
                navigate('/add');
                alert('You have been logged in');
            } else {
                // Handle error responses from the server
                alert(data.error || 'Login failed');
            }
        } catch (error) {
            // Handle fetch errors
            console.error('Error:', error);
            alert('An error occurred during login');
        }
    }

    return (      
        <div className="login-form">
            <Header />
            <h1 className="container offset-sm-3">Login</h1>
            <div className="container col-sm-6">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Enter e-mail"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button
                    onClick={login}
                    className="form-control btn btn-primary"
                    type="submit"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
