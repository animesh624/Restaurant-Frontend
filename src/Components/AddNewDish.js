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

    // if (!dishName || !price || !weight) {
    //   alert('Please fill in all fields.');
    //   return;
    // }

    // if (parseFloat(price) < 0 || parseFloat(price) > 2000) {
    //   alert('Price must be in the range of 0 to 2000.');
    //   return;
    // }

    // if (parseFloat(weight) < 0 || parseFloat(weight) > 999.99) {
    //   alert('Weight must be in the range of 0 to 999.99.');
    //   return;
    // }

    // Create a new dish object
    const newDish = {
      dishName,
      price,
      weight,
    };

    try {
      // Send the new dish data to the backend API
      const response = await axios.post(
        'https://curdapp20230707121043.azurewebsites.net/api/v1',
        newDish
      );

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
            min="0"
            max="2000"
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight:</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="form-control"
            required
            min="0"
            max="999.99"
            step="0.01"
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
