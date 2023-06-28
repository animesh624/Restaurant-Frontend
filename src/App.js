import React, { useState, useEffect } from 'react';
import DishList from './Components/DishList';
import AddNewDish from './Components/AddNewDish';
import EditDish from './Components/EditDish';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Register from './Components/Register';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
const App = () => {
  const token = localStorage.getItem('token');
  

  const handleEdit = (id) => {
    // Handle edit functionality
    console.log(`Editing dish with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete functionality
    console.log(`Deleting dish with ID: ${id}`);
  };

  

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const config = {
  //       headers: {
  //         Authorization: "Bearer " + token
  //       }
  //     };
  //     console.log("Token received ", token);
  //     const response = await axios.get('https://localhost:7236/api/v1', config);
  //     console.log(response.data.data);
  //     setData(response.data.data);
  //     setItems(response.data.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>

      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<DishList onEdit={handleEdit} onDelete={handleDelete} />} />
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
