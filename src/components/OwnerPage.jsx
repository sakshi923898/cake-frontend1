import React, { useEffect, useState } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
const backendURL = 'https://cake-backend-t0i0.onrender.com';

function OwnerPage() {
  const [cakes, setCakes] = useState([]);
  const [newCake, setNewCake] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    fetchCakes();
  }, []);

  const fetchCakes = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/cakes`);
      setCakes(res.data);
    } catch (err) {
      console.error('Error fetching cakes:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCake({ ...newCake, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewCake({ ...newCake, image: e.target.files[0] });
  };

  const handleAddCake = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newCake.name);
    formData.append('price', newCake.price);
    formData.append('description', newCake.description);
    formData.append('image', newCake.image);

    try {
      await axios.post('http://localhost:5000/api/cakes', formData);
      alert('Cake added successfully!');
      setNewCake({ name: '', price: '', description: '', image: null });
      fetchCakes();
    } catch (error) {
      console.error('Error adding cake:', error);
      alert('Failed to add cake');
    }
  };

  const handleDeleteCake = async (id) => {
    if (!window.confirm("Are you sure you want to delete this cake?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/cakes/${id}`);
      fetchCakes();
    } catch (error) {
      console.error('Error deleting cake:', error);
      alert('Failed to delete cake');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>👨‍🍳 Owner Dashboard</h1>

      <Link to="/orders">
        <button style={{ marginBottom: 20 }}>View Orders</button>
      </Link>

      <h2>Add New Cake</h2>
      <form onSubmit={handleAddCake} style={{ marginBottom: 30 }}>
        <input
          type="text"
          name="name"
          placeholder="Cake Name"
          value={newCake.name}
          onChange={handleChange}
          required
        /><br />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newCake.price}
          onChange={handleChange}
          required
        /><br />
        <textarea
          name="description"
          placeholder="Description"
          value={newCake.description}
          onChange={handleChange}
          required
        /><br />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        /><br />
        <button type="submit">Add Cake</button>
      </form>

      <h2>All Cakes</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {cakes.map(cake => (
          <div key={cake._id} style={{ border: '1px solid #ccc', padding: 10, width: 250 }}>
            <img
              src={`http://localhost:5000${cake.imageUrl}`}
              alt={cake.name}
              style={{ width: '100%', height: 150, objectFit: 'cover' }}
            />
            <h3>{cake.name}</h3>
            <p>₹{cake.price}</p>
            <p>{cake.description}</p>
            <button
              onClick={() => handleDeleteCake(cake._id)}
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              Delete
            </button>
            <button onClick={() => navigate('/view-orders')}>
              View Orders
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default OwnerPage;
