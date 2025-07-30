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
import React, { useState } from 'react';
import axios from 'axios';

const backendURL = 'https://cake-backend1.onrender.com';

function Order() {
  const [contact, setContact] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fetched, setFetched] = useState(false);

  const handleFetchOrders = async () => {
    if (!contact) return alert('Please enter your contact number.');

    setLoading(true);
    try {
      const res = await axios.post(`${backendURL}/api/orders/by-contact`, { contact });
      setOrders(res.data);
      setFetched(true);
      setErrorMsg('');
    } catch (err) {
      console.error('Error:', err);
      setErrorMsg('Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📦 View Your Orders</h2>
      <input
        type="text"
        placeholder="Enter your contact number"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <button onClick={handleFetchOrders}>Show My Orders</button>

      {loading && <p>Loading...</p>}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {fetched && orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <div key={order._id} style={{ border: '1px solid #ccc', padding: 10, marginTop: 10 }}>
          <h4>{order.cakeId?.name}</h4>
          <p>Price: ₹{order.cakeId?.price}</p>
          <p>Status: {order.status}</p>
          <p>Contact: {order.contact}</p>
          <p>Address: {order.address}</p>
        </div>
      ))}
    </div>
  );
}

export default Order;
