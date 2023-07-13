import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const DishList = ({ onEdit, onDelete }) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      const response = await axios.get('https://curdapp20230707121043.azurewebsites.net/api/v1', config);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this dish?');
    if (confirmed) {
      try {
        await axios.delete(`https://curdapp20230707121043.azurewebsites.net/api/v1/${id}`);
        onDelete(id);
        // Update the data state by removing the deleted dish
        setData((prevData) => prevData.filter((dish) => dish.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (dish) => {
    try {
      localStorage.setItem('Edit', JSON.stringify(dish));
      navigate('/edit');
    } catch (e) {
      console.log("Not Possible");
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    // console.log("This is file ",file);
    const formData = new FormData();
    formData.append('file', file);
    var fileData;
    const reader = new FileReader();
    
    reader.onload = function (e) {
      fileData = e.target.result;
      console.log("Uploaded file data 1: ", fileData);
      const calling=async ()=>{
        try {
          console.log("Uploaded file data 2: ", fileData);
          // console.log("This is form data ",formData);
          const response = await axios.post('http://localhost:7292/api/takeBlobInput', fileData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
      calling();
    };
    reader.readAsText(file);
    
  };

  return (
    <>
      {data.length > 0 && (
        <div>
          <div className="container">
            <h1 className="text-center my-4">My Restaurant</h1>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="d-flex justify-content-end mb-4">
                  <Link to="/create" className="btn btn-primary">
                    Create Single Dish
                  </Link>
                </div>
                <div className="d-flex justify-content-end mb-4">
                  <input type="file" accept=".json" className="btn btn-primary" onChange={handleFileUpload} />
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <h2 className="my-4">Dish List</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Weight</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {data.map((dish) => (
                  <tr key={dish.id}>
                    <td>{dish.id}</td>
                    <td>{dish.dishName}</td>
                    <td>{dish.price}</td>
                    <td>{dish.weight}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => handleEdit(dish)}>
                        Edit
                      </button>
                      <span style={{ margin: '0 5px' }}></span>
                      <button className="btn btn-danger" onClick={() => handleDelete(dish.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default DishList;
