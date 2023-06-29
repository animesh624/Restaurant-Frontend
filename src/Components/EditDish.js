import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const EditDish = () => {
  const [dishName, setdishName] = useState('');
  const [price, setPrice] = useState();
  const [weight, setWeight] = useState();
  const [editDish,setEditDish]=useState();
  const [Id,setId]=useState();
  const navigate = useNavigate();
  useEffect(() => {
    // Extract the dish item from local storage
      const temp =  JSON.parse(localStorage.getItem('Edit'));
      setEditDish(temp);
      setdishName(temp.dishName);
      setPrice(temp.price);
      setWeight(temp.weight);
      setId(temp.id);
      console.log("Outside getData",temp);
      console.log(temp.dishName);
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new dish object
    const newDish = {
      Id,
      dishName,
      price,
      weight
    };

    try {
      // Send the new dish data to the backend API
      console.log(newDish);
      newDish.Id=parseInt(Id);
      newDish.dishName=dishName;
      newDish.price=parseInt(price);
      newDish.weight=parseInt(weight);
      console.log("Before Axios Post",newDish);
      const response = await axios.put(`https://webappnewcreated.azurewebsites.net/api/v1/update/${Id}`, newDish);

      // Reset the form fields
      setdishName('');
      setPrice('');
      setWeight('');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  const CancelEdit = () => {
    navigate("/");
  };

  return (
    <>
       <div className="container my-5">
       {editDish && <form onSubmit={handleSubmit}>
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
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Edit Dish
      </button>
      <button className="btn btn-primary" onClick={() => CancelEdit()}>
          Cancel Edit
      </button>
    </form>}
       </div>
       
       
    </>
    
  );
};

export default EditDish;
