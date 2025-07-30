// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Order() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get('https://cake-backend1.onrender.com/api/orders');
//       // https://cake-backend1.onrender.com
//       setOrders(res.data);
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//     }
//   };

//   const confirmDelivery = async (orderId) => {
//     try {
//       setLoading(true);
//       await axios.patch(`https://cake-backend1.onrender.com/api/orders/${orderId}/confirm`);
//       setMessage('Thank you for confirming your delivery!');
//       fetchOrders(); // Refresh the list
//     } catch (error) {
//       console.error('Error confirming order:', error);
//       setMessage('Failed to confirm delivery. Please try again.');
//     } finally {
//       setLoading(false);
//       setTimeout(() => setMessage(''), 3000); // Clear message after 3 sec
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Your Orders</h2>
//       {message && <p style={{ color: message.includes('Failed') ? 'red' : 'green' }}>{message}</p>}
//       {orders.length === 0 && <p>No orders yet.</p>}
//       {orders.map(order => (
//         <div key={order._id} style={{ border: '1px solid #ddd', marginTop: 10, padding: 10 }}>
//           {order.cakeId && (
//             <>
//               <h4>Cake: {order.cakeId.name}</h4>
//               {/* <img
//                 src={`https://cake-backend1.onrender.com${order.cakeId.imageUrl}`}
//                 alt={order.cakeId.name}
//                 style={{ width: 150, height: 100, objectFit: 'cover' }}
//               /> */}
//               <p>Price: ₹{order.cakeId.price}</p>
//             </>
//           )}
//           <p><strong>Name:</strong> {order.customerName}</p>
//           <p><strong>Contact:</strong> {order.contact}</p>
//           <p><strong>Address:</strong> {order.address}</p>
//           <p><strong>Status:</strong> {order.status}</p>
//           {order.status !== 'Delivered' && (
//             <button
//               onClick={() => confirmDelivery(order._id)}
//               disabled={loading}
//             >
//               {loading ? 'Confirming...' : 'Confirm Delivery'}
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Order;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Order = () => {
  const [contact, setContact] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('contact');
    if (saved) setContact(saved);
  }, []);

  const handleFetchOrders = async () => {
    if (!contact.trim()) return alert('Please enter a contact number.');

    setLoading(true);
    setError('');
    setOrders([]);

    try {
      const response = await axios.get(
        `https://cake-backend1.onrender.com/api/orders/by-contact?contact=${contact.trim()}`
      );
      setOrders(response.data);
      localStorage.setItem('contact', contact.trim());
    } catch (err) {
      console.error('Order fetch error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong while fetching orders.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>My Orders</h2>

      <div>
        <input
          type="text"
          placeholder="Enter contact number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <button onClick={handleFetchOrders} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Orders'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {orders.length > 0 &&
        orders.map((order, i) => (
          <div key={i} style={{ border: '1px solid #ccc', marginTop: '1rem', padding: '1rem' }}>
            <h4>{order.cakeId?.name || 'Cake not found'}</h4>
            {order.cakeId?.imageUrl && (
              <img
                src={order.cakeId.imageUrl}
                alt={order.cakeId.name}
                style={{ width: '100%', height: 'auto' }}
              />
            )}
            <p>Status: {order.status}</p>
            <p>Ordered on: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))}
    </div>
  );
};

export default Order;
