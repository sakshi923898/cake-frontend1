// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const backendURL = 'https://cake-backend1.onrender.com';

// function CustomerDashboard() {
//   const [cakes, setCakes] = useState([]);
//   const [selectedCake, setSelectedCake] = useState(null);
//   const [order, setOrder] = useState({ customerName: '', contact: '', address: '' });
  
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(true);
//     axios.get(`${backendURL}/api/cakes`)
//       .then(res => setCakes(res.data))
//       .catch(err => console.error('Error fetching cakes:', err))
//       .finally(() => setLoading(false));
//   }, []);

//   const handleOrderChange = (e) => {
//     setOrder({ ...order, [e.target.name]: e.target.value });
//   };

//   const handleOrderSubmit = async () => {
//     if (!order.customerName || !order.contact || !order.address) {
//       return alert("Please fill out all fields before submitting.");
//     }
//     try {
//       await axios.post(
//         `${backendURL}/api/orders`,
//         { ...order, cakeId: selectedCake._id },
//         { headers: { 'Content-Type': 'application/json' } }
//       );
//       setShowConfirmation(true);
//       setOrder({ customerName: '', contact: '', address: '' });
//       setSelectedCake(null);
//     } catch {
//       console.error('Error placing order');
//       alert('Failed to place order.');
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <h1>🎂 Welcome to the Cake Shop</h1>
//         <button
//           onClick={() => navigate("/orders")}
//           style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: 4 }}
//         >Show My Orders</button>
//       </div>

//       <h2>Available Cakes</h2>
//       {loading ? <p>Loading cakes…</p> : (
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
//           {cakes.map(cake => (
//             <div key={cake._id} style={{ border: '1px solid #ccc', padding: 10, width: 250 }}>
//               <img
//                 src={cake.imageUrl}
//                 alt={cake.name}
//                 style={{ width: '100%', height: 150, objectFit: 'cover' }}
//               />
//               <h3>{cake.name}</h3>
//               <p>₹{cake.price}</p>
//               <p>{cake.description}</p>
//               <button onClick={() => { setSelectedCake(cake); setShowConfirmation(false); }}>
//                 Order This
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedCake && (
//         <>
//           <hr />
//           <h2>Order: {selectedCake.name}</h2>
//           <img
//             src={`${backendURL}${selectedCake.imageUrl}`}
//             alt={selectedCake.name}
//             style={{ width: 200, height: 120, objectFit: 'cover' }}
//           />
//           <br /><br />
//           <input name="customerName" placeholder="Your Name" value={order.customerName} onChange={handleOrderChange} /><br />
//           <input name="contact" placeholder="Contact Number" value={order.contact} onChange={handleOrderChange} /><br />
//           <textarea name="address" placeholder="Delivery Address" value={order.address} onChange={handleOrderChange} /><br />
//           <button onClick={handleOrderSubmit}>Submit Order</button>
//         </>
//       )}

//       {showConfirmation && (
//         <div style={{ marginTop: 20, padding: 15, background: '#d4edda', border: '1px solid #28a745' }}>
//           ✅ Thank you! Your order has been placed.
//         </div>
//       )}
//     </div>
//   );
// }

// export default CustomerDashboard;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendURL = 'https://cake-backend1.onrender.com';

function CustomerDashboard() {
  const [cakes, setCakes] = useState([]);
  const [selectedCake, setSelectedCake] = useState(null);
  const [order, setOrder] = useState({ customerName: '', contact: '', address: '' });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`${backendURL}/api/cakes`)
      .then(res => setCakes(res.data))
      .catch(err => console.error('Error fetching cakes:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleOrderChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async () => {
    if (!order.customerName || !order.contact || !order.address) {
      return alert("Please fill out all fields before submitting.");
    }
    try {
      await axios.post(
        `${backendURL}/api/orders`,
        { ...order, cakeId: selectedCake._id },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setShowConfirmation(true);
      setOrder({ customerName: '', contact: '', address: '' });
      setSelectedCake(null);
    } catch {
      console.error('Error placing order');
      alert('Failed to place order.');
    }
  };

  const handleCloseForm = () => {
    setSelectedCake(null);
    setShowConfirmation(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'
      }}>
        <h1>🎂 Welcome to the Cake Shop</h1>
        <button
          onClick={() => navigate("/orders")}
          style={{
            padding: '10px 20px', backgroundColor: '#007bff', color: '#fff',
            border: 'none', borderRadius: 4, marginTop: 10
          }}
        >Show My Orders</button>
      </div>

      <h2>Available Cakes</h2>
      {loading ? <p>Loading cakes…</p> : (
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
              <button onClick={() => { setSelectedCake(cake); setShowConfirmation(false); }}>
                Order This
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Order Form Overlay */}
      {selectedCake && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{
            background: '#fff', padding: 20, borderRadius: 8,
            maxWidth: 400, width: '90%', position: 'relative'
          }}>
            <button onClick={handleCloseForm} style={{
              position: 'absolute', top: 10, right: 10, background: 'transparent',
              border: 'none', fontSize: 18, cursor: 'pointer'
            }}>✖</button>

            <h2>Order: {selectedCake.name}</h2>
            <img
              src={`${backendURL}${selectedCake.imageUrl}`}
              alt={selectedCake.name}
              style={{ width: '100%', height: 150, objectFit: 'cover', marginBottom: 10 }}
            />

            <input
              name="customerName"
              placeholder="Your Name"
              value={order.customerName}
              onChange={handleOrderChange}
              style={{ width: '100%', marginBottom: 10 }}
            /><br />
            <input
              name="contact"
              placeholder="Contact Number"
              value={order.contact}
              onChange={handleOrderChange}
              style={{ width: '100%', marginBottom: 10 }}
            /><br />
            <textarea
              name="address"
              placeholder="Delivery Address"
              value={order.address}
              onChange={handleOrderChange}
              style={{ width: '100%', marginBottom: 10 }}
            /><br />
            <button onClick={handleOrderSubmit} style={{ width: '100%', padding: 10, backgroundColor: '#28a745', color: '#fff', border: 'none' }}>
              Submit Order
            </button>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div style={{ marginTop: 20, padding: 15, background: '#d4edda', border: '1px solid #28a745' }}>
          ✅ Thank you! Your order has been placed.
        </div>
      )}
    </div>
  );
}

export default CustomerDashboard;
