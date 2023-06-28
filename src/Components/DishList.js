import React ,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

const DishList = ({ onEdit, onDelete }) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this dish?');
    if (confirmed) {
      try {
        await axios.delete(`https://localhost:7236/api/v1/${id}`);
        onDelete(id);
        navigate('/'); // Redirect to the home page after deletion
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleEdit =  (dish) => {
    console.log("Inside handleEdit ",dish);
    try{
      localStorage.setItem("Edit",JSON.stringify(dish)); 
      console.log("Possible");
      // Store the dish item in local storage
    }
    catch(e){
         console.log("Not Possible");
    }
    
    navigate("/edit");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      console.log("Token received ", token);
      const response = await axios.get('https://localhost:7236/api/v1', config);
      console.log(response.data.data);
      setData(response.data.data);
      setItems(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
       {data.length>0 && <div>
       <div className="container">
        <h1 className="text-center my-4">My Restaurant</h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
          <div className="d-flex justify-content-end mb-4">
              <Link to="/create" className="btn btn-primary">Create Dish</Link>
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
              <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(dish)}
                >
                  Edit
                </button>
                
                <span style={{ margin: '0 5px' }}></span>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(dish.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
       </div>} 
       
       
    </>
    
  );
};

export default DishList;
