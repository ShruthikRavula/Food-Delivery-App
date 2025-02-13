import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
    })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    location: credentials.geolocation,
                    password: credentials.password,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.errors}`);
            }
            if (response.ok) {
                navigate("/")
            }

            const json = await response.json();
            console.log(json);


        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <div className="container">
            <div>
                <Navbar />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input type="text" className="form-control" name="email" value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We will never share your email with anyone else</div>
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label for="geolocation" className="form-label">Address</label>
                        <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login/" className="m-3 btn btn-danger">Already a user</Link>
                </form>
                <Footer />
            </div>
        </div>
    )
}
