// export default Order;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('https://cake-backend1.onrender.com/api/orders');
      // Only keep orders that are NOT delivered
      const notDeliveredOrders = res.data.filter(order => order.status !== 'Delivered');
      setOrders(notDeliveredOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const confirmDelivery = async (orderId) => {
    try {
      setLoading(true);
      await axios.patch(`https://cake-backend1.onrender.com/api/orders/${orderId}/confirm`);
      setMessage('Thank you for confirming your delivery!');
      // Remove the confirmed (delivered) order from view
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error confirming order:', error);
      setMessage('Failed to confirm delivery. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 sec
    }
  };



  //tempo
  const deleteOrder = async (orderId) => {
    const confirm = window.confirm('Are you sure you want to delete this order?');
    if (!confirm) return;

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
      <h2>Your Orders</h2>
      {message && <p style={{ color: message.includes('Failed') ? 'red' : 'green' }}>{message}</p>}
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.map(order => (
        <div key={order._id} style={{ border: '1px solid #ddd', marginTop: 10, padding: 10 }}>
          {order.cakeId && (
            <>
              <h4>Cake: {order.cakeId.name}</h4>
              {/* <img
                src={`https://cake-backend1.onrender.com${order.cakeId.imageUrl}`}
                alt={order.cakeId.name}
                style={{ width: 150, height: 100, objectFit: 'cover' }}
              /> */}
              <p>Price: ₹{order.cakeId.price}</p>
            </>
          )}
          <p><strong>Name:</strong> {order.customerName}</p>
          <p><strong>Contact:</strong> {order.contact}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Status:</strong> {order.status}</p>
          {order.status !== 'Delivered' && (
            <button
              onClick={() => confirmDelivery(order._id)}
              disabled={loading}
            >
              {loading ? 'Confirming...' : 'Confirm Delivery'}
            </button>
          )}
          
        </div>
      ))}


    </div>
  );
}

export default Order;



