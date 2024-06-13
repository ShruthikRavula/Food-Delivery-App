import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });



      const json = await response.json();
      console.log(json.authToken);

      if (!json.success) {
        alert("Enter valid credentials")
      }
      if (json.success) {
        localStorage.setItem("userEmail", credentials.email)
        localStorage.setItem("authToken", json.authToken)
        await alert("logged in successfully")
        navigate("/")
      }

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
            <label for="email" className="form-label">Email address</label>
            <input type="text" className="form-control" name="email" value={credentials.email} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
          </div>

          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/createuser/" className="m-3 btn btn-danger">I'm a new user</Link>
        </form>
        <Footer />
      </div>
    </div>
  )
}
