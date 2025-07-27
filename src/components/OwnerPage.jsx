import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerDashboardPage = () => {
  const [cakes, setCakes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCakes = async () => {
    try {
      const response = await axios.get('https://cake-backend-t0i0.onrender.com/api/cakes');
      setCakes(response.data);
    } catch (error) {
      console.error('❌ Error fetching cakes:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://cake-backend-t0i0.onrender.com/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCakes();
      await fetchOrders();
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Owner Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* 🍰 All Cakes */}
          <h2 className="text-lg font-semibold mt-4">All Cakes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cakes.map((cake) => (
              <div key={cake._id} className="border p-4 shadow rounded">
                <img src={cake.imageUrl} alt={cake.name} className="w-full h-48 object-cover rounded mb-2" />
                <h3 className="text-lg font-semibold">{cake.name}</h3>
                <p>Price: ₹{cake.price}</p>
                <p>{cake.description}</p>
              </div>
            ))}
          </div>

          {/* 📦 All Orders */}
          <h2 className="text-lg font-semibold mt-6">Customer Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Customer Name</th>
                  <th className="border px-4 py-2">Cake</th>
                  <th className="border px-4 py-2">Contact</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td className="border px-4 py-2">{order.customerName}</td>
                      <td className="border px-4 py-2">{order.cakeId?.name || 'Unknown Cake'}</td>
                      <td className="border px-4 py-2">{order.contact}</td>
                      <td className="border px-4 py-2">{order.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default OwnerDashboardPage;
