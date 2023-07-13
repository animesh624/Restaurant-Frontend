import React, { useState, useEffect } from 'react';
import DishList from './Components/DishList';
import AddNewDish from './Components/AddNewDish';
import EditDish from './Components/EditDish';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import axios from 'axios';
import Register from './Components/Register';
import Login from './Components/Login';
import Navbar from './Components/Navbar';

const App = () => {
  // const navigate = useNavigate();

  const handleEdit = (id) => {
    // Handle edit functionality
    console.log(`Editing dish with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete functionality
    console.log(`Deleting dish with ID: ${id}`);
  };

  

  // useEffect(() => {
  //     const token=localStorage.getItem('token');
  //   if(token){
  //     navigate("/home");
  //   }
  //   else{
  //     navigate("/register");
  //   }
    
  // }, [navigate]);
  return (
    <>

      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<DishList onEdit={handleEdit} onDelete={handleDelete} />} />
          <Route exact path="/create" element={<AddNewDish />} />
          <Route exact path="/edit" element={<EditDish />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>

  );
};

export default App;
