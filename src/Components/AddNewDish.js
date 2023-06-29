import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNewDish = () => {
  const [dishName, setdishName] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new dish object
    const newDish = {
      dishName,
      price,
      weight
    };

    try {
      // Send the new dish data to the backend API
      console.log(newDish);
      const response = await axios.post('https://webappnewcreated.azurewebsites.net/api/v1', newDish);

      // Reset the form fields
      setdishName('');
      setPrice('');
      setWeight('');
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="container my-5">
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="dishName">Name of Dish:</label>
        <input
          type="text"
          id="dishName"
          value={dishName}
          onChange={(e) => setdishName(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="weight">Weight:</label>
        <input
          type="text"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Dish
      </button>
    </form>
    </div>
    
  );
};

export default AddNewDish;
