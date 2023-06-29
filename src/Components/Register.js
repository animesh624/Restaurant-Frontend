import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [UserName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new dish object
    const newUser = {
      UserName,
      Email,
      Password
    };

    try {
      // Send the new dish data to the backend API
      
      newUser.UserName=UserName;
      newUser.Email=Email;
      newUser.Password=Password;
      console.log(newUser);
      const response = await axios.post('https://webappnewcreated.azurewebsites.net/register1', newUser);

      // Reset the form fields
      setUserName('');
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container my-5">
        <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="UserName">UserName</label>
        <input
          type="text"
          id="UserName"
          value={UserName}
          onChange={(e) => setUserName(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          id="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
            Register
      </button>
    </form>
    </div>
    
  );
};

export default Register;
