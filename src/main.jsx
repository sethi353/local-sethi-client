// import React from 'react'
// import ReactDOM from 'react-dom/client'
// // import { RouterProvider } from "react-router-dom";
// // import router from "./routes/router"; 
// import App from './App'
// import './index.css'
// import AuthProvider from './context/AuthContext'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AuthProvider>
//        {/* <RouterProvider router={router} /> */}
//       <App />
//     </AuthProvider>
//   </React.StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AuthProvider from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
