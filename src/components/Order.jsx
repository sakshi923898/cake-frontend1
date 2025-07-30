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

// ✅ Define only the backend base URL (no path or query here)
const backendURL = 'https://cake-backend1.onrender.com';

const Order = () => {
  const [contact, setContact] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Load saved contact from localStorage
  useEffect(() => {
    const savedContact = localStorage.getItem('contact');
    if (savedContact) {
      setContact(savedContact);
    }
  }, []);

  const handleFetchOrders = async () => {
    if (!contact) {
      alert('Please enter your contact number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setOrders([]);
    try {
      const res = await axios.post(`${backendURL}/api/orders/by-contact`, {
        contact: contact.trim(),
      });
      setOrders(res.data);
      setFetched(true);
      localStorage.setItem('contact', contact.trim());
    } catch (err) {
      console.error('Error:', err);
      setErrorMsg('Contact not found. Please place an order first.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', margin: 'auto', paddingTop: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>Your Orders</h2>

      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Enter your contact number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          style={{
            padding: '10px',
            width: '70%',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={handleFetchOrders}
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Show My Orders
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      {fetched && orders.length === 0 && !loading && (
        <p>No orders found for this contact.</p>
      )}

      {orders.length > 0 && (
        <div>
          {orders.map((order, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ddd',
                padding: '15px',
                marginBottom: '1rem',
                borderRadius: '8px',
              }}
            >
              <img
                src={order.cakeId?.image}
                alt={order.cakeId?.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <h3>{order.cakeId?.name}</h3>
              <p><strong>Price:</strong> ₹{order.cakeId?.price}</p>
              <p><strong>Contact:</strong> {order.contact}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;

