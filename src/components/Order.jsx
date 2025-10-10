// // export default Order;
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
//       // Only keep orders that are NOT delivered
//       const notDeliveredOrders = res.data.filter(order => order.status !== 'Delivered');
//       setOrders(notDeliveredOrders);
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//     }
//   };

//   const confirmDelivery = async (orderId) => {
//     try {
//       setLoading(true);
//       await axios.patch(`https://cake-backend1.onrender.com/api/orders/${orderId}/confirm`);
//       setMessage('Thank you for confirming your delivery!');
//       // Remove the confirmed (delivered) order from view
//       setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
//     } catch (error) {
//       console.error('Error confirming order:', error);
//       setMessage('Failed to confirm delivery. Please try again.');
//     } finally {
//       setLoading(false);
//       setTimeout(() => setMessage(''), 3000); // Clear message after 3 sec
//     }
//   };



//   //tempo
//   const deleteOrder = async (orderId) => {
//     const confirm = window.confirm('Are you sure you want to delete this order?');
//     if (!confirm) return;

//     try {
//       await axios.delete(`https://cake-backend1.onrender.com/api/orders/delete/${orderId}`);
//       setOrders(prev => prev.filter(order => order._id !== orderId));
//       setMessage('Order deleted successfully.');
//     } catch (error) {
//       console.error('Error deleting order:', error);
//       setMessage('Failed to delete order.');
//     } finally {
//       setTimeout(() => setMessage(''), 3000);
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

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Form state
  const [customerName, setCustomerName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [selectedCake, setSelectedCake] = useState({ name: '', price: 0 });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('https://cake-backend1.onrender.com/api/orders');
      const notDeliveredOrders = res.data.filter(order => order.status !== 'Delivered');
      setOrders(notDeliveredOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  // Submit order
  const placeOrder = async (e) => {
    e.preventDefault();

    if (!customerName || !contact || !address || !selectedCake.name) {
      setMessage('Please fill all fields and select a cake.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('https://cake-backend1.onrender.com/api/orders', {
        customerName,
        contact,
        address,
        cakeName: selectedCake.name,
        price: selectedCake.price
      });
      setMessage(res.data.message);
      setCustomerName('');
      setContact('');
      setAddress('');
      setSelectedCake({ name: '', price: 0 });
      fetchOrders(); // refresh order list
    } catch (err) {
      console.error('Error placing order:', err);
      setMessage('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const confirmDelivery = async (orderId) => {
    try {
      setLoading(true);
      await axios.patch(`https://cake-backend1.onrender.com/api/orders/${orderId}/confirm`);
      setMessage('Thank you for confirming your delivery!');
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error confirming order:', error);
      setMessage('Failed to confirm delivery. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const deleteOrder = async (orderId) => {
    const confirmDel = window.confirm('Are you sure you want to delete this order?');
    if (!confirmDel) return;

    try {
      await axios.delete(`https://cake-backend1.onrender.com/api/orders/delete/${orderId}`);
      setOrders(prev => prev.filter(order => order._id !== orderId));
      setMessage('Order deleted successfully.');
    } catch (error) {
      console.error('Error deleting order:', error);
      setMessage('Failed to delete order.');
    } finally {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Place Your Order</h2>
      {message && <p style={{ color: message.includes('Failed') ? 'red' : 'green' }}>{message}</p>}

      {/* Order Form */}
      <form onSubmit={placeOrder} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Your Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Cake Name"
          value={selectedCake.name}
          onChange={(e) => setSelectedCake({ ...selectedCake, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={selectedCake.price}
          onChange={(e) => setSelectedCake({ ...selectedCake, price: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>

      <h2>Your Orders</h2>
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.map(order => (
        <div key={order._id} style={{ border: '1px solid #ddd', marginTop: 10, padding: 10 }}>
          <h4>Cake: {order.cakeName}</h4>
          <p>Price: ₹{order.price}</p>
          <p><strong>Name:</strong> {order.customerName}</p>
          <p><strong>Contact:</strong> {order.contact}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Status:</strong> {order.status}</p>
          {order.status !== 'Delivered' && (
            <button onClick={() => confirmDelivery(order._id)} disabled={loading}>
              {loading ? 'Confirming...' : 'Confirm Delivery'}
            </button>
          )}
          <button onClick={() => deleteOrder(order._id)} disabled={loading} style={{ marginLeft: 10 }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Order;
