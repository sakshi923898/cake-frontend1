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

const backendURL = 'https://cake-backend1.onrender.com';

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const contact = localStorage.getItem('contact');
      if (!contact) {
        setErrorMsg('Contact not found. Please place an order first.');
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`${backendURL}/api/orders/by-contact/${contact}`);
        setOrders(res.data);
        setErrorMsg('');
      } catch (err) {
        console.error('Fetch error:', err);
        setErrorMsg('Failed to load your orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📦 Your Orders</h2>
      {loading && <p>Loading...</p>}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {orders.length === 0 && !loading && <p>No orders found.</p>}
      {orders.map((order) => (
        <div key={order._id} style={{ border: '1px solid gray', marginTop: 10, padding: 10 }}>
          <h4>{order.cakeId?.name}</h4>
          <p>Price: ₹{order.cakeId?.price}</p>
          <p>Status: {order.status}</p>
          <p>Address: {order.address}</p>
        </div>
      ))}
    </div>
  );
}

export default Order;
