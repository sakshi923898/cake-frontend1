// // src/main.jsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App";
// import Order from "./components/Order";
// import OwnerLogin from "./components/OwnerLogin";
// import OwnerDashboard from "./components/OwnerPage";
// import ProtectedOwnerRoute from "./utils/ProtectedOwnerRoute";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <BrowserRouter>
//     <Routes>
//       {/* App includes CustomerDashboard, Header, Footer etc. */}
//       <Route path="*" element={<App />} />

//       {/* Standalone order route */}
//       <Route path="/orders" element={<Order />} />

//       {/* Owner login route */}
//       <Route path="/owner/login" element={<OwnerLogin />} />

//       {/* Owner protected dashboard route */}
//       <Route path="/owner/dashboard" element={
//         <ProtectedOwnerRoute>
//           <OwnerDashboard />
//         </ProtectedOwnerRoute>
//       } />
//     </Routes>
//   </BrowserRouter>
// );


// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
