import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditDish = () => {
  const [dishName, setdishName] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [editDish, setEditDish] = useState(null);
  const [Id, setId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem('Edit'));
    setEditDish(temp);
    setdishName(temp?.dishName || '');
    setPrice(temp?.price || '');
    setWeight(temp?.weight || '');
    setId(temp?.id || '');
  }, []);

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

    const newDish = {
      Id,
      dishName,
      price: parseFloat(price),
      weight: parseFloat(weight),
    };

    try {
      await axios.put(`https://webappnewcreated.azurewebsites.net/api/v1/update/${Id}`, newDish);
      setdishName('');
      setPrice('');
      setWeight('');
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    navigate('/home');
  };

  return (
    <div className="container my-5">
      {editDish && (
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
            Edit Dish
          </button>
          <button className="btn btn-primary" onClick={handleCancelEdit}>
            Cancel Edit
          </button>
        </form>
      )}
    </div>
  );
};

export default EditDish;
