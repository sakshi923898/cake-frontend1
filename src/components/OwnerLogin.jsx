


// src/components/OwnerLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OwnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const backendURL = "https://your-backend-url.onrender.com"; // 🔹 Replace with your Render backend URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${backendURL}/api/owner/login`, {
        email,
        password,
      });

      console.log("Login response:", res.data);

      if (res.data.token) {
        localStorage.setItem("ownerToken", res.data.token);
        alert("Login successful!");
        navigate("/owner/dashboard");
      } else {
        alert("Login failed: Token not received.");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("Login failed! Please check your email or password.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Owner Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default OwnerLogin;

// 

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const OwnerLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "https://cake-backend1.onrender.com/api/owner/login",
//         { email, password }
//       );

//       const { token, owner } = res.data;

//       // ✅ Save token + email
//       // localStorage.setItem("ownerToken", token);
//       localStorage.setItem("ownerToken", res.data.token);
//       localStorage.setItem("ownerEmail", owner.email);

//       alert("Login successful!");
//       navigate("/owner/dashboard");
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//       alert(error.response?.data?.message || "Login failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto" }}>
//       <h2>Owner Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Owner Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={{ width: "100%", margin: "10px 0", padding: "8px" }}
//         />
//         <input
//           type="password"
//           placeholder="Owner Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{ width: "100%", margin: "10px 0", padding: "8px" }}
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             width: "100%",
//             padding: "10px",
//             backgroundColor: "#4CAF50",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default OwnerLogin;
