import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backendURL = 'https://cake-backend1.onrender.com';

function OwnerPage() {
  const [cakes, setCakes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const [newCake, setNewCake] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    fetchCakes();
    fetchOrders();
  }, []);
  //feacch notification
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000); // every 15 sec
    return () => clearInterval(interval);
  }, []);



  const fetchCakes = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/cakes`);
      setCakes(res.data);
    } catch (err) {
      console.error('Error fetching cakes:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('ownerToken');
      const res = await axios.get(`${backendURL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err.response?.data || err.message);
      alert('Order fetch failed. Please try again or login again.');
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
      await axios.post(`${backendURL}/api/cakes`, formData);
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
      await axios.delete(`${backendURL}/api/cakes/${id}`);
      fetchCakes();
    } catch (error) {
      console.error('Error deleting cake:', error);
      alert('Failed to delete cake');
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleNextPage = () => {
    if (indexOfLastOrder < orders.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/notifications`);
      setNotifications(res.data);
      const unread = res.data.filter(n => !n.isRead).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };
  
  const markAsRead = async (id) => {
    try {
      await axios.patch(`${backendURL}/api/notifications/${id}/read`);
      fetchNotifications();
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };


  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>👨‍🍳 Owner Dashboard</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={() => setShowOrders(!showOrders)}>
            {showOrders ? '⬅️ Back to Cakes' : '🧾 View Orders'}
          </button>

          {/* 🔔 Notification Bell Icon */}
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowNotifications(!showNotifications)}>
            <span style={{ fontSize: '24px' }} title="Notifications">🔔</span>
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: -5,
                right: -5,
                background: 'red',
                color: 'white',
                borderRadius: '50%',
                width: 18,
                height: 18,
                fontSize: 12,
                textAlign: 'center',
                lineHeight: '18px'
              }}>
                {unreadCount}
              </span>
            )}
          </div>

          {/* 🔔 Notification List */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '50px',
              right: '10px',
              background: 'white',
              border: '1px solid #ccc',
              padding: '10px',
              width: '300px',
              zIndex: 1000
            }}>
              <h4>🔔 Notifications</h4>
              {notifications.length === 0 ? (
                <p>No notifications</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {notifications.map((note) => (
                    <li key={note._id} style={{ background: note.isRead ? '#f0f0f0' : '#ffe0e0', padding: '6px 10px', marginBottom: '6px' }}>
                      {note.message} <br />
                      <small>{new Date(note.createdAt).toLocaleString()}</small>
                      {!note.isRead && (
                        <div>
                          <button onClick={() => markAsRead(note._id)} style={{ marginTop: 4, fontSize: 12 }}>Mark as Read</button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

        </div>
      </div>
      {/* {notifications.length > 0 && (
        <div style={{ marginTop: 10, padding: 10, backgroundColor: '#ffffe0', border: '1px solid #ccc' }}>
          <h3>🔔 Notifications</h3>
          {notifications.map((n) => (
            <div key={n._id} style={{ marginBottom: 8, backgroundColor: n.isRead ? '#f0f0f0' : '#ffe0e0', padding: 8 }}>
              <span>{n.message}</span>
              {!n.isRead && (
                <button onClick={() => markAsRead(n._id)} style={{ marginLeft: 10 }}>
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      )} */}

      {showOrders ? (
        <>
          <h2>🧾 Customer Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <>
              <table border="1" cellPadding="10" style={{ marginTop: 10, width: '100%', backgroundColor: '#f9f9f9' }}>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Price</th>
                    <th>Cake</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map(order => (
                    <tr key={order._id}>
                      <td>{order.customerName}</td>
                      <td>{order.contact}</td>
                      <td>{order.address}</td>
                      <td>
                        {order.cakeId?.price ? `₹${order.cakeId.price}` : 'N/A'}
                      </td>
                      <td>
                        {order.cakeId ? (
                          <>
                            <strong>{order.cakeId.name}</strong><br />
                            {/* Optional image display */}
                            {/* <img
              src={`${backendURL}${order.cakeId.imageUrl.startsWith('/') ? order.cakeId.imageUrl : `/uploads/${order.cakeId.imageUrl}`}`}
              alt={order.cakeId.name}
              width="80"
              height="60"
              style={{ objectFit: 'cover' }}
            /> */}
                          </>
                        ) : 'Cake Deleted'}
                      </td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>

              </table>

              <div style={{ marginTop: 15 }}>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>⬅️ Prev</button>
                <span style={{ margin: '0 10px' }}>Page {currentPage}</span>
                <button onClick={handleNextPage} disabled={indexOfLastOrder >= orders.length}>Next ➡️</button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
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
                  src={cake.imageUrl}
                  alt={cake.name}
                  style={{ width: '100%', height: 150, objectFit: 'cover' }}
                />
                <h3>{cake.name}</h3>
                <p>₹{cake.price}</p>
                <p>{cake.description}</p>
                <button onClick={() => handleDeleteCake(cake._id)} style={{ backgroundColor: 'red', color: 'white' }}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default OwnerPage;
